const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(cors())
app.set('view engine','ejs');


const con = mongoose.connect('mongodb://127.0.0.1:27017/keeper');

const schema = mongoose.Schema({
    title : {
        type : String,
        required : [true,"Why no title?"]
       },
    content : {
        type : String,
        required : [true,"Why no text?"]
       }
});

const Note = mongoose.model("Note",schema);

app.get("/",function(req,res){
   async function run() {
    
     const notes = await  Note.find({}).exec();
    // console.log(notes);
     res.send(notes);
   }
   run();
})

app.post("/",function(req,res){
   async  function run() {
        const note = new Note({
            title : req.body.title,
            content : req.body.content
        })
        await note.save();
        res.redirect(req.url);
        
    }
    run();
})

app.delete("/",function(req,res){
    async function run(){
        console.log(req.body);
     await Note.findOneAndDelete({_id:req.body.id});
        res.redirect(req.url);
    }
    run();
})
app.listen(3000,function(){
    console.log("Listening on port 3000");
})