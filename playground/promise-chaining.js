require("../src/db/mongoose");
const User = require("../src/models/User");

// User.findByIdAndUpdate("5ce515758a1d7c17a3d829c4", { age: 1 })
//   .then(user => {
//     console.log(user);
//     return User.countDocuments({ age: 1 });
//   })
//   .then(res => {
//     console.log(res);
//   })
//   .catch(err => {
//     console.log(err);
//   });

  const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({ age })
    return count
  }

  updateAgeAndCount('5ce515758a1d7c17a3d829c4', 2).then((count) => {
    console.log(count)
  }).catch((err) => {
    console.log(err);
  })