import { LatLngBounds } from 'leaflet';
import { filter } from 'lodash';
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

const buildQueryFromState = (state? : VRampState) : any => {
    // Filter by material or size if specified
    let builtQuery = {
        match_all: {}
    };

    if (state && (state.filterMaterial || state.filterSize))
    {
        let newQuery : any = {
            bool: {}
        }

        if (state.filterMaterial)
        {
            newQuery.bool.must = {};
            newQuery.bool.must.match = {
                material: state.filterMaterial
            }
        }

        if (state.filterSize)
        {
            newQuery.bool.filter = {
                range: {

                }
            };

            switch (state.filterSize)
            {
                case '[0, 50)':
                    newQuery.bool.filter.range.area_ = {
                        gte: 0,
                        lt: 50
                    }
                break;

                case '[50, 200)':
                    newQuery.bool.filter.range.area_ = {
                        gte: 50,
                        lt: 200
                    }
                break;

                case '[200, 526)':
                    newQuery.bool.filter.range.area_ = {
                        gte: 200,
                        lt: 526
                    }
                break;
            }
        }

        builtQuery = newQuery;
    }

    return builtQuery;
}

export const loadAllRamps = async (state? : VRampState) => {


    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: buildQueryFromState(state)
        },
        size: 250
    });

    store.dispatch(geodataLoaded(geoData));

}

export const loadMaterials = async (state? : VRampState) => {
    
    const bounds : LatLngBounds | undefined = state?.bounds || store.getState().bounds;
    let must : any = {
        match_all: {}
    }

    let filters : any = {
        geo_shape: {
            geometry: {                                
                shape: {
                    type: 'envelope',
                    coordinates: [ [bounds?.getWest(), bounds?.getNorth()], [bounds?.getEast(), bounds?.getSouth()]]
                }
            }
        }
    }

    const filterQuery = buildQueryFromState(state);
    if (filterQuery.bool?.must?.match?.material)
        must = {
            match: {
                material: filterQuery.bool?.must?.match?.material
            }
        }
    
    if (filterQuery.bool?.filter?.range?.area_)
        filters = [filters, {range: filterQuery.bool?.filter?.range}];

    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                bool: {
                    must: {
                        ...must
                    },
                    filter: filters
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

    let must : any = {
        match_all: {}
    }

    let filters : any = {
        geo_shape: {
            geometry: {                                
                shape: {
                    type: 'envelope',
                    coordinates: [ [bounds?.getWest(), bounds?.getNorth()], [bounds?.getEast(), bounds?.getSouth()]]
                }
            }
        }
    }

    const filterQuery = buildQueryFromState(state);
    if (filterQuery.bool?.must?.match?.material)
        must = {
            match: {
                material: filterQuery.bool?.must?.match?.material
            }
        }
    
    if (filterQuery.bool?.filter?.range?.area_)
        filters = [filters, {range: filterQuery.bool?.filter?.range}];

    const geoData = await client.search({
        index: INDEX_NAME,
        body: {
            query: {
                bool: {
                    must: {
                        ...must
                    },
                    filter: filters
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