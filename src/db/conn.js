const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

//  Creating a database
mongoose.connect("mongodb://127.0.0.1:27017/AshuraDynamic",{
    useUnifiedTopology: true
}).then(()=>{
    console.log("Connection Created");
}).catch((err)=>{
    console.log("Error: " + err);
});
