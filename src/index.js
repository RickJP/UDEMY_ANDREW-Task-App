const express = require("express");
require("./db/mongoose");
const Task = require('./models/Task')
const User = require('./models/User')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// w/o middleware:  new request -> run route handler
// with middleware: new request -> do smth -> run route handler

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});



const main = async () => {
  
  try {
    const user = await User.findById('5ce74f0827e94f0494da6f5f')
    await user.populate('tasks').execPopulate()
    console.log(user.tasks)
    
  } catch (err) {
    console.log('Cannot find task for that user')
  }
  
  // const task = await Task.findById('5ce751d0b1da1105099b77fc')
  
  // try {
  //   await task.populate('owner').execPopulate()
  // } catch (err) {
  //   console.log(err)
  // }
  // console.log(task.owner)
  
}

main()