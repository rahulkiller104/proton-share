import './App.css';
import Download from './component/Download';
import Upload from './component/upload';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
function App() {
  return ( 
  
    <Router>
      <Switch>
      <Route path="/" exact>
          <Upload />
        </Route> 
        <Route path="/:uuid" exact>
          <Download />
        </Route>
      </Switch> 
    </Router>
    
 
 
  );
}

export default App;
