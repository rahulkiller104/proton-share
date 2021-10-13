import * as React from 'react';
import Card from './Card';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './upload.css'
import axios from 'axios';
import CircularIntegration from './UploadButton';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Email from './Email';
import Clipboard from './Clipboard';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Navbar from './navbar';
// import {CopyToClipboard} from 'react-copy-to-clipboard';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

const Upload =()=>{
    const [selectedFile,setSelectedFile]=useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showemail, setShowemail] = useState(false);
    const fileInput = useRef(null);
    const [uuid,setUuid]=useState(null);
    // const [url,setUrl]=useState(null);
    const [open, setOpen] = React.useState(false);


    

     const fileUpload=(event)=>{
         setSelectedFile(event.target.files[0]);
     
     }
   
    
   
    const submitFile=()=>{
        const formData = new FormData();
        formData.append('myfile',selectedFile);
        setSuccess(false);
        setLoading(true);
        axios.post('http://localhost:5000/api/files',formData
        ).then((res)=>{
            setSuccess(true);
            setLoading(false);
            setShowemail(true);
            setUuid(res.data.uuid);
            
        }).catch(err=>{
            setSuccess(false);
            setLoading(false);
            setOpen(true);
        })
     }
     let details=null;

     if(selectedFile){
         details=(
             <div className='details'> 
              <p><span style={{fontWeight: 600, fontFamily: 'sans-serif'}}>FileName: </span>{selectedFile.name.slice(0, 20) + (selectedFile.name.length > 20 ? "..." : "")}</p>
              <p><span style={{fontWeight: 600, fontFamily: 'sans-serif'}}>Size: </span>{Math.round(selectedFile.size/1000)}KB</p>
             </div>
         )
     }

     const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
     
   

    return(
        <div>
            <Navbar/>
            <Card>
            <h2>Upload The File Here.</h2>
        
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                  Something went wrong, please try again!
                </Alert>
              </Snackbar>
            <input type='file'  onChange={fileUpload}  ref={fileInput}  className='input-file'/>
           { <button className='btn' onClick={()=>fileInput.current.click()}>
            <UploadFileIcon className='icon-style'  sx={{ fontSize: 100}} />
            <Button variant="outlined" style={{marginRight:'10%',marginBottom:'15%'}} >Select File</Button>
            </button>
          } 

          {selectedFile&&details}

          {success&&<Clipboard
          value={`http://localhost:3000/${uuid}`}
          />}
            
            { selectedFile&&
           <CircularIntegration 
           className='submitbtn'
           onSubmit={submitFile} 
           loading={loading}
           success={success}
           >Upload</CircularIntegration>
            }
            </Card>
            {showemail&&<Email
            uuid={uuid}
            />}
        </div>
    )
}

export default Upload;