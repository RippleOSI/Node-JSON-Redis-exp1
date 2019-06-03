const express = require('express')
const axios = require('axios')
const config = require('./config')
const bodyParser = require('body-parser')

/* START EXPRESS APPLICATION */
const app = express()

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

/* URL Routing for API */
app.use('/api', require('./routes/api'))

/* Make Post Request to save sample data */
app.get('/', function(req, res, next) {

    // Axios POST Request to store sample data for each datatype
    for (datatype in config.datatypes) {
        try {
            axios.post(`http://localhost:3000/api/${datatype}`, {
                ptId: config.ptId,
                data: config.sample_data[datatype]
            })
        }
        catch(err) {
            next(err)
        }    
    }
    
    res.send(`Sample data is saved with axios request with ptId = ${config.ptId}`);
});

app.listen(config.port, () => {
    console.log(`Server started on port ${config.port}`);
})
