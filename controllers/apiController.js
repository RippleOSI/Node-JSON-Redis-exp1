var db = require('../db')
var config = require('../config')
var { JSONtransform } = require('../libraries/JSONtransform')

// URL handler for api datatypes
module.exports.handleDatatype = (req, res) => {

    // Retrive datatype from the request parms
    const datatype = req.params.datatype
    
    // Check if datatype is valid
    if (config.datatypes.indexOf(datatype) == -1) {
        res.json('Invalid datatype');
        return;
    }

    // Handle GET Request
    if (req.method == 'GET') {

        // Get the query params
        var ptId = req.query.ptId;
        var transform = req.query.transform;

        // Check if ptId is passed
        if (ptId == null) {
            res.json('Invalid query params.');
            return;
        }

        // Retrieve data from database
        db.json_get(`${req.params.datatype}_${ptId}`, `.`, function (err, data) {
            if (err) { throw err; }
            data = JSON.parse(data);
            if (data && transform) {
                data.patientId = ptId;
                res.json(JSONtransform(data, transform));
            } else {
                res.json(data);
            }
        });
        
        return;
    }

    if (req.method == 'POST') {

        // API for POST
        var ptId = req.body.ptId
        var data = JSON.parse(req.body.data)

        db.json_set(`${req.params.datatype}_${ptId}`, '.', JSON.stringify(data), function (err) {
            if (err) {
                throw err;
            }
            res.json({'success': "True"})
        });
    }
}
