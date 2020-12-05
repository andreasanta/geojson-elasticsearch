import store from '../store';
import { geodataLoaded } from '../store/actions';

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace',
    apiVersion: '7.x'
});

export const loadAllRamps = async () => {

    const geoData = await client.search({
        index: 'geotest',
        body: {
            query: {
                match_all: {}
            }
        },
        size: 250
    });

    store.dispatch(geodataLoaded(geoData));

}