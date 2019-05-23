const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const connectionUrl = "mongodb://127.0.0.1:27017";

const dbName = "task-manager";

MongoClient.connect(connectionUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("Uable to connect to database.");
  }
  const db = client.db(dbName);

  // db.collection('users').insertOne({
  //     name: 'Mike',
  //     age: 45
  // }, (err, res) => {
  //     if (err) {
  //         return console.log('Uable to insert user');
  //     }
  //     console.log(res.ops);
  // })

  // db.collection("users").insertMany([
  //   {
  //     name: "Harry",
  //     age: 23
	// 	},
	// 	{
	// 		name: 'Andy',
	// 		age: 67
	// 	}
  // ], (err, res) => {
	// 	if (err) {
	// 		return console.log('Unable to insert docs')
	// 	}
	// 	console.log(res.ops);
	// });


	db.collection('tasks').insertMany([
		{
			description: 'Do the washing',
			completed: true
    },
    {
			description: 'Weed the garden',
			completed: true
    },
    {
			description: 'Buy some milk',
			completed: false
		}
	], (err, res) => {
    if (err) {
      return console.log('Cannot insert doc')
    }
    console.log(res.ops)
  })
});
