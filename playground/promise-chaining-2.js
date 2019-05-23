require('../src/db/mongoose')
const Task = require('../src/models/Task')

// Task.findByIdAndDelete('5ce5e418ce852c1ba04f7ae7').then((task) =>{
//   console.log(task)
//   return Task.countDocuments({completed: false})
// }).then((res) => {
//   console.log(res)
// }).catch((err) => {
//   console.log(err)
// })

const deleteTaskAndCount = async (id) => {
  const task = await Task.findByIdAndDelete(id)
  const count = await Task.countDocuments({completed: false})
  return count
}

deleteTaskAndCount('5ce5e566cc5d0e1ba8a4b700').then((count) => {
  console.log(count)
}).catch((err) => {
  console.log(err);
})


