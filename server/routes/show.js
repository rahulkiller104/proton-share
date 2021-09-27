const router=require('express').Router();
const HttpError=require('../model/http-error');
const File=require('../model/file');

router.get('/:uuid',async(req,res,next)=>{
    const uuid=req.params.uuid;

    let response;

    try{
        response=await File.findOne({uuid:uuid});

        if (!response) {
            const error = new HttpError(
              'Could not find any file .',
              404
            );
            return next(error);
          }


    }catch (err) {
        const error = new HttpError(
          'Something went wrong, could not find a place.',
          500
        );
        return next(error);
      }

     
   

      res.json({
          uuid:response.uuid,
          fileName:response.filename,
          fileSize:response.size,
          downloadLink:response.path
        })
})

module.exports=router;