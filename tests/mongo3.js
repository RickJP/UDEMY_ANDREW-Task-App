const { MongoClient, ObjectId } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const dbName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.error("Unable to connect to db");
  }
  const db = client.db(dbName);

//   db.collection("users").updateOne(
//     {
//       _id: new ObjectId("5ce4bc1c85afe61325bb23e8")
//     },
//     {
//       $inc: {
//           age: 5
//       }
//     }
//   ).then(res => {
//       console.log(res);
//     })
//     .catch(err => {
//       console.error(err);
//     });

    db.collection('tasks').updateMany({completed: false},
        {
          $set: {
            completed: true
          }
        }
      ).then(res => {
        console.log(res.modifiedCount)
      }).catch(err => {
        console.error(err);
      })
        
});
