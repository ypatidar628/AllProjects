import express from 'express';

const app = express();

app.get('/service', (req, res) => {
    console.log("Get URL ==> Service Invoked"); 
    res.send("Get URL ==> Service Invoked")
})

app.post('/service', (req, res) => {
    console.log("Post URL ==> Service Invoked"); 
    res.send("Post URL ==> Service Invoked")
})  

app.put('/service', (req, res) => {
    console.log("Put URL ==> Service Invoked"); 
    res.send("Put URL ==> Service Invoked")
})
app.patch('/service', (req, res) => {
    console.log("Patch URL ==> Service Invoked"); 
    res.send("Patch URL ==> Service Invoked")
})

app.delete('/service', (req, res) => {
    console.log("Delete URL ==> Service Invoked"); 
    res.send("Delete URL ==> Service Invoked")
})

app.listen(8989, () => {
    console.log('Server Invoked :');
});
