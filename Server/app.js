const express=require('express')
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const WorkBook=require('./schema')
const cors=require('cors')
const xlsx=require('xlsx')
const path=require('path')
const CsvUpload = require("express-fileupload");
const fs=require('fs')
const uri="mongodb+srv://vignesh:Vignesh%40444@cluster0.myjq5pk.mongodb.net/vigneshDB?retryWrites=true&w=majority"

mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log("not connected",err)});


const app=express();
app.use(cors({origin:'*'}))
app.use(CsvUpload());
app.use(bodyParser.json());
app.use(express.json());
app.get('/user',async (req,res)=>{
    console.log('hit ')
   const resp = await WorkBook.find();
   return res.status(200).json({success:true, data: resp})
   
})
app.post("/upload",async(req,res)=>{
    try{
        const files=req.files;
        if (!files){
            return res.status(404).json({success:false,message:'file not found'})
        }
        console.log('files', files.myfile)
        const sheets=parseXlsx(files.myfile)
        const  filename = files.myfile.name;
        const data = {filename, sheets};
        const doc = new WorkBook(data);
        const res = await doc.save()
        res.status(201).json(data);
        

}
catch(err){
    res.status(200).json(err)
}
})

function parseXlsx(file){
    const workbook= xlsx.read(file.data)
    const sheetNames = workbook.SheetNames; 
    const jsonWorkBook = {}
    sheetNames.forEach((sheetName) => {
        jsonWorkBook[sheetName] = transformJson(xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]))
   })
   console.log(Object.keys(jsonWorkBook));
   return jsonWorkBook;
}

const transformJson = (json= []) => {
    return json.map((row) => {
        const copy = {}
        Object.keys(row).forEach((key) => {
            const newKey = removeEmptyStr(key);
            copy[newKey] = row[key];  
        })
        return copy;
    })
}
const removeEmptyStr = (str) => {
    const removed =  str.replace('__EMPTY','')
    if(removed) { 
        return removed.replace('_', '');
    }
    return 0;
}








const PORT=4000
app.listen(PORT,()=>{
        console.log("sever is running in",PORT)
})