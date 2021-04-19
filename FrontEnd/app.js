import "./App.scss";
import MainPage from './components/main-page/main-page.jsx'
import Login from './components/login/login.jsx';
import {Route, Switch} from 'react-router-dom';


function App() {
  return (
    <div className="App">
    
      <div className='app-container'>
      <Switch>
        <Route exact path='/' component={MainPage} />
        <Route path='/login' component={Login} />
      
      </Switch>
        
      </div>
    </div>
  );
}

export default App;
