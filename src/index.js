
const express = require("express");
require("./db/mongoose");
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

const jwt = require('jsonwebtoken')

const myFunction = async() => {
  const token = jwt.sign({_id: 'abc123'},'thisisgreat', { expiresIn: '7 days'})

  const data = jwt.verify(token, 'thisisgreat')
  console.log(data)
}

myFunction()