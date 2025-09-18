import express from 'express';
const app = express()



import indexRoute from "./routes/index.js"
import adminRoute from "./routes/admin.js"
import managerRoute from "./routes/manager.js"

app.set("view engine","ejs")
//Controller search view files (ejs file) on views folder (by-default)
app.set('views','./views');  //'/.views' : folder name with path

app.use("/",indexRoute);
app.use("/admin",adminRoute);
app.use("/manager",managerRoute);


app.listen(8989,()=>{
    console.log("Server Invoked :");
})