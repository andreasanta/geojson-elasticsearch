# The V-Ramp project

As instructed, this project loads a list of boat ramps, displays it on a map and allows filtering.

## Preliminary notes

In order to optimize search queries, a dockerized image of ElasticSearch has been used and
GeoJSON data has been parsed and injected into a custom index. The script

`scripts/geojson_es_import.py``

Executes the import when ElasticSearch is running.

NOTE: the "ramps" index must have been previously created with the mapping in the folder `data/es_mapping.json`,
to allow proper querying of the index from the front-end.

## Bootstrapping

In order to run the project, first we need to launch docker compose with the default yaml in the project root.

`docker-compose up -d`

This will launch an ElasticSearch instance and a development React server on the same containerized network.

Before using the system, the "ramps" index must be created on ElasticSearch:

```bash
    curl --location --request PUT 'http://localhost:9200/ramps' \
        --header 'Content-Type: application/json' \
        --data @data/es_mapping.json
```

This will create the index in ElasticSearch with the proper mapping.

Next, we have to import all the ramps data via the Python script, which can simply be run as:

`scripts/geojson_es_import.py`

If all went well, you should be able to connect to `http://localhost:3000` and view the map!

## TODO
- Improve system bootstrapping and production build
- Write acceptance test
- Refactor geo filtering code in APIs
- Harmonize data passed down to graph for future reuse