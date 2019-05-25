const express = require("express");
require("./db/mongoose");
const userRouter = require('./routes/user')
const taskRouter = require('./routes/task')

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

