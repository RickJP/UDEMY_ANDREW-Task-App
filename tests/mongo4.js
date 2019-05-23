const {MongoClient, ObjectId} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (err, client) => {
  if (err) {
    return console.error('Unable to connect to db')
  }
  const db = client.db(dbName);

  // db.collection('users').deleteMany({
  //   age: 45
  // }).then((res) => {
  //   console.log(res.deletedCount)
  // }).catch((err) => console.error(err))

  db.collection('tasks').deleteOne({
    description: "Do the washing"
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.error(err)
  })
})