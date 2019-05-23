const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
  useNewUrlParser: true, 
  useCreateIndex: true
})

const Task = mongoose.model('task', {
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const task = new Task({
  
})

task.save().then(()=> {
  console.log(task)
}).catch((err) => {
  console.error(err);
})