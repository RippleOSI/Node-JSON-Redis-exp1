var config = require('../config.js')
var jsonata = require('jsonata')

const JSONtransform = (json, typeString) => {
    const jsonata_map = config.jsonata_maps[typeString]
    
    if (jsonata_map == null) {
        return 'Invalid Transform Type';
    }

    return jsonata(jsonata_map).evaluate(json);
}

module.exports = {
    JSONtransform
}