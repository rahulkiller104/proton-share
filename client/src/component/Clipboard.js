import './Clipboard.css'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const Clipboard=(props)=>{
  
    return(
        <div className='text-copy'>
         <input  type='text' value={props.value} className='text'/>
          <button onClick={()=>{
              navigator.clipboard.writeText(props.value)
          }}>
              <ContentCopyIcon  sx={{fontSize:20}} />
          </button>     
        </div>
    )
}

export default Clipboard;