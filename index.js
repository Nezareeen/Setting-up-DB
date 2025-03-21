const express = require("express");
const mongoose = require("mongoose");
const mySchema = require("./schema");

const app = express();
app.use(express.json());

const user = mongoose.model('user',mySchema);

app.listen(3030, async()=>{
    try {
        await mongoose.connect("mongodb+srv://nezareeen:8irkCxLntI0a37ka@cluster0.lzeyh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Server connected sucessfully");
    } catch (error) {
        console.log(error);
    }
});

app.get('/ping',async(request,response)=>{
    try {
        const User = await user.find();
        response.status(200).send({msg:"Connected Successfully",data: User});
    } catch (error) {
        console.log(error);
        response.status(500).send({msg:"Something went wrong"});
    }
})



app.post('/ponging',async(request,response)=>{
    const newUser = new user(request.body);
    

    const savedUser = await newUser.save();

    try {
        response.status(201).send({msg:"User created successfully",data:savedUser});
    } catch (error) {
        console.log(error)
    }

})

