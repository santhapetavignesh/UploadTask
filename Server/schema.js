const mongoose=require('mongoose')

const WorkBook=new mongoose.Schema({
    filename: String,
    sheets: Object
})

const WorkBookSchema =new mongoose.model("workbooks",WorkBook);


module.exports=WorkBookSchema;