const { MongoClient, ObjectID } = require("mongodb");
const connetionUrl = "mongodb://127.0.0.1:27017";

const dbName = "task-manager";

MongoClient.connect(connetionUrl, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.error("Unable to connect to database");
  }

  const db = client.db(dbName);

  //   db.collection("users").findOne(
  //     { _id: new ObjectID("5ce4c0e85d8260141e25f3d2") },
  //     (err, user) => {
  //       if (err) {
  //         return console.error("Unable to fetch user");
  //       }

  //       console.log(user);
  //     }
  //   );

//   db.collection("users")
//     .find({ age: 45 })
//     .toArray((err, users) => {
//       console.log(users);
//     });
//   db.collection("users")
//     .find({ age: 45 })
//     .count((err, users) => {
//       console.log(users);
//     });
    db.collection("tasks").find({completed: false}).toArray((err, tasks) => {
        console.log(tasks)
    })
});
