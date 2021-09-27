import './Clipboard.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { useState } from 'react';


const Clipboard=(props)=>{
    // const[copy,setCopy]=useState(false);
    return(
        <div className='text-copy'>
         <input  type='text' value={props.value} className='text'/>
         {/* <CopyToClipboard text={props.value}
        //   onCopy={() => setCopy(true)}
          
          > */}
          <button onClick={()=>{
              navigator.clipboard.writeText("copied")
          }}>
              <ContentCopyIcon  sx={{fontSize:20}} />
          </button>
        {/* </CopyToClipboard> */}
         
        </div>
    )
}

export default Clipboard;