import Card from './Card'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Button, CircularProgress } from '@mui/material';
import Alert from '@mui/material/Alert';
const Download=()=>{
   const [response,setResponse]=useState(null);
   const [error,setError]=useState(false);
    const uuid=useParams().uuid;
    useEffect(()=>{
        axios.get(`http://localhost:5000/files/${uuid}`)
        .then(res=>{
         setResponse(res.data);
        })
        .catch(err=>{
            setError(true);
        })
    },[uuid])
 
  if(error){
      return(
        <Card>
        <h2>Download Your file</h2>
        <Alert severity="error">Something Went Wrong</Alert>
         <CloudDownloadIcon  sx={{ fontSize: 100,color:'#64B5F6'}}/>
         </Card>
      )
  }

    return(
        <Card>
            <h2>Download Your file</h2>
             <CloudDownloadIcon  sx={{ fontSize: 100,color:'#64B5F6'}}/>
             {!response? ( <CircularProgress style={{display:'block',margin:'auto'}}/>):
            ( <div>
             <p style={{color:'grey',margin:'5px'}}>FileName:<b>{response.fileName}</b></p>
             <p style={{color:'grey',margin:'10px'}}>Size:<b>{Math.round(response.fileSize/1000)}KB</b></p>
             <a href={response.downloadLink} style={{textDecoration: 'none',margin:'20px'}} >
             <Button  variant="contained">Download</Button>
             </a>
             </div>)
            } 
        </Card>
    )
}

export default Download;