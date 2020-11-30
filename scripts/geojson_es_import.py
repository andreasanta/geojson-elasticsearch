import json
import pandas as pd
from elasticsearch import Elasticsearch
from elasticsearch.helpers import streaming_bulk
import tqdm

INDEX_NAME='geotest'

# Import the GeoJSON data into Pandas, so we can pre-process it a bit
with open('./data/boat_ramps.geojson') as f: 
    d = json.load(f) 

# Normalize via the "Features" field
rampsData = pd.json_normalize(d['features']) 

# Rename columns
rampsData.rename(columns={
    'id': '_id',
    'geometry.coordinates': 'coordinates'
}, inplace=True)

# Bulk rename the ones with prefix
print(rampsData.columns.names)
rampsData.columns = [n.replace('properties.', '') for n in rampsData.columns]

# Build new column for ElasticSearch insertion
rampsData['geometry'] = rampsData.apply(lambda row: { 'type': row['geometry.type'], 'coordinates': row['coordinates']}, axis=1)

# Delete unused columns
rampsData = rampsData.drop(columns=[
    'type',
    'geometry_name',
    'geometry.type',
    'coordinates'
])


print(rampsData.head(10))
print(rampsData.head(1).to_json(orient='records',index=True))

# Now index it into ElasticSearch
client = Elasticsearch('localhost')

print("Indexing documents...")
progress = tqdm.tqdm(unit="docs", total=rampsData.shape[0])
successes = 0
for ok, action in streaming_bulk(
    client=client, index=INDEX_NAME, actions=rampsData.to_dict('records'),
):
    progress.update(1)
    successes += ok

print("Indexed %d/%d documents" % (successes, rampsData.shape[0]))
