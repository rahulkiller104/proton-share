const router=require('express').Router();
const path = require("path")
require('dotenv').config();
const multer = require("multer");
const HttpError=require('../model/http-error');
const File =require('../model/file');
const {v4:uuid4}=require('uuid');
const sendMail=require('../service/emailService');
const emailTemplate=require('../service/emailTemplate');
const multers3 = require('multer-s3');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_ID,
    secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY
});

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: (req, file, cb) => {
      cb(null, {fieldName: file.fieldname})
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname)
    }
  })
});


router.post('/',uploadS3.single("myfile") ,async(req,res,next)=>{

    // upload(req,res,async(err)=>{

        // if(!req.file){
        //     const error = new HttpError('fill the all field.', 404);
        //     next(error);
        // }
    
        // if(err){
        //     const error = new HttpError('could not find the file', 404);
        //     next(error);
        // }
      //  console.log(req.file);


        const file=new File({
            filename:req.file.originalname,
            uuid:uuid4(),
            path:req.file.location,
            size:req.file.size
        })
      //  console.log(req.file.location);
     let response;
    try{
         response=await file.save();
        }catch(err){
          const error = new HttpError(
              err,
              500
            );
            return next(error);
        }

        return res.status(200).json({uuid:response.uuid,path:req.file.location});

    // })

});
     



router.post('/send',async(req,res,next)=>{
  //  console.log(req.body);
  const {uuid,emailTo,emailFrom}=req.body;
  
  if(!uuid || !emailTo || !emailFrom){
    const error = new HttpError(
        'All fields are required',
        422
      );
      return next(error);
  }
  
  let response;

  try{
    response=await File.findOne({uuid:uuid});

    if(response.sender){
        const error = new HttpError(
            'Email already sent.',
            422
          );
          return next(error);
    }

    response.sender=emailFrom;
    response.receiver=emailTo;

    const file=await response.save();


    //send email 
     sendMail({
        from:emailFrom,
        to:emailTo,
        subject:'Proton file Sharing',
        text:`${emailFrom} shared a file with you`,
        html:emailTemplate({
            emailFrom:emailFrom,
            downloadLink:response.path,        
            size:parseInt(response.size/1000)+'KB',
            expires:'24 hours'
        })
    })
  


}catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

 return res.json({messgae:"Success"});


})


module.exports=router;