import Box from '@mui/material/Box';
import Card from "./Card";
import TextField from '@mui/material/TextField';
import CircularIntegration from './UploadButton';
import { useState } from 'react';
import axios from 'axios';


const  Email=props=>{

     const [senderEmail,setSenderEmail]=useState(null);
     const [recieverEmail,setRecieverEmail]=useState(null);
     const [loading, setLoading] = useState(false);
     const [success, setSuccess] = useState(false);
     const uuid=props.uuid;
      
     const submitHandler=()=>{
         setLoading(true);
         setSuccess(false);
     const data={
         emailTo:recieverEmail,
         emailFrom:senderEmail,
         uuid:uuid
     }
     axios.post('http://localhost:5000/api/files/send',data)
    .then(response =>{
        // console.log(response);
        setLoading(false);
         setSuccess(true);
    }).catch(err=>{
        setLoading(false);
        setSuccess(false);
    })


     }
     const sendEmailHandler=(event)=>{
     setSenderEmail(event.target.value);
     }
     const recieveEmailHandler=(event)=>{
         setRecieverEmail(event.target.value);
    }


    return(
        <Card>
             <h2>Send the file by email</h2>
             <Box
      sx={{
        display: 'block',
        alignItems: 'center',
        '& > :not(style)': { m:1 },
        marginTop:2,
      }}
    >
        <TextField onChange={sendEmailHandler} id="demo-helper-text-misaligned-no-helper" label="Your Email" /> 
        <TextField onChange={recieveEmailHandler} id="demo-helper-text-misaligned-no-helper" label="Reciever Email" />

       
    </Box>
             
             <CircularIntegration
             onSubmit={submitHandler}
             loading={loading}
             success={success}
             >Send</CircularIntegration>
        </Card>
            
    )
}
export default Email;