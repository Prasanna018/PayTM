const express = require("express") // reuqiring the express
const app = express();
app.use(express.json())
const bodyParser = require("body-parser");
app.use(bodyParser.json())
const UserRoute = require('./Routes/User')
const cors = require("cors");
app.use(cors());



app.use(UserRoute);










app.listen(3000, () => {
    console.log("server is running on port 3000");

})

