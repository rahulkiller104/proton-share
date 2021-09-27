const router=require('express').Router();
const HttpError=require('../model/http-error');
const File=require('../model/file');

router.get('/:uuid',async(req,res,next)=>{
    const uuid=req.params.uuid;
    let response;
    let filePath;
    try{
        response=await File.findOne({uuid:uuid});

        if (!response) {
            const error = new HttpError(
              'Link has been expired .',
              404
            );
            return next(error);
          }
 
     filePath=response.path;

    
    }catch (err) {
        const error = new HttpError(
          'Something went wrong, could not find a place.',
          500
        );
        return next(error);
      }
  
      res.download(filePath);
   


})

module.exports=router;