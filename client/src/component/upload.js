import Card from './Card';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import './upload.css'
import axios from 'axios';
import CircularIntegration from './UploadButton';
import { useRef, useState } from 'react';
import { Button } from '@mui/material';
import Email from './Email';
import Alert from '@mui/material/Alert';
import Clipboard from './Clipboard';
// import {CopyToClipboard} from 'react-copy-to-clipboard';


const Upload =()=>{
    const [selectedFile,setSelectedFile]=useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showemail, setShowemail] = useState(false);
    const fileInput = useRef(null);
    const [uuid,setUuid]=useState(null);
    // const [url,setUrl]=useState(null);
    const [error,setError]=useState(false);

    

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
            setError(true);
        })
     }
     let details=null;

     if(selectedFile){
         details=(
             <div className='details'>
              <p>FileName:{selectedFile.name}</p>
              <p>Size:{Math.round(selectedFile.size/1000)}KB</p>
             </div>
         )
     }
     
   

    return(
        <div>
            <Card>
            <h2>Upload The File Here.</h2>
        
            {error&&
            ( <Alert severity="error">Something Went Wrong</Alert>)}
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