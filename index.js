const express = require ("express");
const fs = require ("fs");
const status = require ("express-status-monitor");

const zlib = require ("zlib");

const app = express();
const PORT = 8000;
app.use (status());

// app.get ("/", (req,res)=> {                                       /// Peak while refresh the browser
//     fs.readFile ("./sample.txt", "utf-8", (err,data)=> {
//         if (err){
//             res.end (err);
//         }
//         else {
//             res.end (data);
//         }
//     });
// });

fs.createReadStream ("./sample.txt").pipe(
    zlib.createGzip ()).pipe (fs.createWriteStream("./sample.zib"));


app.get ("/",(req,res)=> {                                            ///  NO peak while refresh the browser
    const stream = fs.createReadStream ("./sample.txt","utf-8");
    stream.on ("data",(chunk) => res.write (chunk));
    stream.on ("end", ()=> res.end());
})

app.listen (PORT, ()=> console.log (`server started at PORT ${PORT}`));


// http://localhost:8000/status  --> use this to dispaly the status as well
