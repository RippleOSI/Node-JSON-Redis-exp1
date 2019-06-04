# Node-JSON-Redis-exp1
experiment with Node, JSON and Redis 

Description
    A simple expression application for storing JSON data to Redis Database.
    It uses ReJSON module from Redis.

Installation Guide

    - Local Environment
        1. Install node.
        2. npm install
        3. node app.js

    - Docker
        1. docker build -t json2redis .
        2. docker-compose up
        
        
Operation       

We use this to show how;  
*  sample JSON data can be persisted in Redis DB
*  we can use GET and POST APIs to add/query more data
*  we can use JSONata tranform to transform the persisted JSON into other JSON variants
        
eg http:// (local host) :3000/api/allergies?ptId=12346&transform=TransformB-Allergy-UI2FHIR

See example data & transforms in config file

Searching on the Redis DB is by key 
eg
https://github.com/RippleOSI/Node-JSON-Redis-exp1/blob/e5631660ee51e8448a6a51e4e3faac7c165b3ea6/controllers/apiController.js#L31
```
db.json_set(`${req.params.datatype}_${ptId}`, '.', JSON.stringify(data), function (err) {
```
which allows for a search like this; JSON.GET "allergies_12345" within Redis
