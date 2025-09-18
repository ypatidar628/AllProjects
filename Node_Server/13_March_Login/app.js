import express from "express"
const app = express();
import bodyParser from "body-parser";

import adminRoute from './routes/admin.js'
import indexRoute from './routes/index.js'
import managerRoute from './routes/manager.js'

//Configure ejs module
app.set("view engine","ejs")
//Controller search ejs file by default inside the view folder but folder name different add below code
app.set('views','./views');

//Set Configuration using : POST,PUT,PATCH,DELETE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",indexRoute);
app.use("/admin",adminRoute);
app.use("/manager",managerRoute);

app.listen(8989,()=>{
  console.log("Server Invoked :");
})