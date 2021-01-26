// import logo from './logo.svg';
import './App.css';
import {Menu} from './Components/Menu';
import {Home, UploadFile, Filter} from './Components/Pages';
import  {HomePage, UploadMovie}  from "./Components/FunComponent";
import { CreateUser, ViewUser, Edit} from "./Components/Singup";
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <>
    <Menu/>
    <Switch>
      <Route path='/home' component={Home}/>
      <Route path='/filter/:id' component={Filter}/>
      <Route path='/upload' component={UploadFile}/>

      <Route path='/homepage' component={HomePage}/>
      <Route path='/addmovie' component={UploadMovie}/>

      <Route path='/create' component={CreateUser}/>
      <Route path='/list' component={ViewUser}/>
      <Route path='/edit1/:id' component={Edit}/>
    </Switch>
   </>
  );
}

export default App;
