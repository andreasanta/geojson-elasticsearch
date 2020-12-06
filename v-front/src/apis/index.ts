import { LatLngBounds } from 'leaflet';
import store from '../store';
import { geodataLoaded, materialdataLoaded, areadataLoaded } from '../store/actions';
import { VRampState } from '../store/types';

const INDEX_NAME = 'ramps';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.x'
});

export const loadAllRamps = async () => {

    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                match_all: {}
            }
        },
        size: 250
    });

    store.dispatch(geodataLoaded(geoData));

}

export const loadMaterials = async (state? : VRampState) => {
    
    const bounds : LatLngBounds | undefined = state?.bounds || store.getState().bounds;

    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                bool: {
                    must: {
                        match_all: {}
                    },
                    filter: {
                        geo_shape: {
                            geometry: {                                
                                shape: {
                                    type: 'envelope',
                                    coordinates: [ [bounds?.getWest(), bounds?.getNorth()], [bounds?.getEast(), bounds?.getSouth()]]
                                }
                            }
                        }
                    },
                }
            },
            aggs: {
                materials:
                {
                    terms: {
                        field: "material"
                    }
                }
            }
        },
        size: 0 // this skips returning hits
    });

    store.dispatch(materialdataLoaded(geoData));

}

export const loadSizes = async (state? : VRampState) => {

    const bounds : LatLngBounds | undefined = state?.bounds || store.getState().bounds;

    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                bool: {
                    must: {
                        match_all: {}
                    },
                    filter: {
                        geo_shape: {
                            geometry: {                                
                                shape: {
                                    type: 'envelope',
                                    coordinates: [ [bounds?.getWest(), bounds?.getNorth()], [bounds?.getEast(), bounds?.getSouth()]]
                                }
                            }
                        }
                    },
                }
            },
            aggs: {
                area_ranges: {
                    range: {
                        field: "area_",
                        keyed: true,
                        ranges: [
                            { key: '[0, 50)', to: 50.0 },
                            { key: '[50, 200)', from: 50.0, to: 200.0 },
                            { key: '[200, 526)', from: 200.0, to: 526 }
                        ]
                    }
                }
            }
        },
        size: 0
    });

    store.dispatch(areadataLoaded(geoData));

}