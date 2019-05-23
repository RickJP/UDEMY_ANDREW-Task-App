
const express = require("express");
require("./db/mongoose");
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


// const bcrypt = require('bcryptjs');

// const myFunc = async() => {
//   const pw = 'happy123'
//   const hashedPw = await bcrypt.hash(pw, 8)

//   console.log(pw, '  ', hashedPw)

//   const isMatch = await bcrypt.compare('happy123', hashedPw);
//   console.log(isMatch);

// }

// myFunc()