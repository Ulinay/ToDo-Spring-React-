import todoData from './todosData'
import { Component } from 'react'
import Header from './Components/Header'
import Home from './Components/Home'
import List from './Components/List'
import { BrowserRouter, Redirect, Route } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login'
import Logout from './Components/Logout'

class App extends Component{
 render(){
return(
    <BrowserRouter>
<div>
<Header />
<Route exact path="/">
 <Redirect to='/home'/>
</Route>
<Route path='/logout' component={Logout}/>
<Route path='/home' component={Home}/>
<Route path='/list' component={List}/>
<Route path='/login' component={Login}/>
<Route path='/register' component={Register}/>
</div>
</BrowserRouter>
);

 }
}
export default App;