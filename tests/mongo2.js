
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionUrl =  "mongodb://127.0.0.1:27017";
const dbName="shop"

MongoClient.connect(connectionUrl, {useNewUrlParser: true}, (err, client) => {
    if (err) {
        return console.log('Unable to connect to database.');
    }
    const db = client.db(dbName);

    db.collection('customers').insertMany([
        {
            name: 'Frank',
            City: 'London'
        },
        {
            name: 'Chris',
            City: 'Scotland'
        }, 
        {
            name: 'Denise',
            City: 'Paris'
        }], (err, res) => {
            if (err) {
                return console.log('Unable to add customers')
            }
            console.log(res.ops);
        })
})

