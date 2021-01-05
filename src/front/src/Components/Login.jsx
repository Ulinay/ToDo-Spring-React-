import axios from "axios";
import { Component } from "react";
import { Redirect } from "react-router";

function LoginUser(params){
axios.post('http://localhost:8080/api/v1/login',params).then(resp =>{
    const token = resp.data.jwtToken;
    localStorage.setItem('jwtToken',token)
    window.location = '/'
})
}



export default class Login extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    changeHandler= (e) =>{
        this.setState({[e.target.name]:e.target.value})
        }
onSubmit(e){
    e.preventDefault()
    LoginUser(this.state)
}


    render(){
        const {username, password} = this.state;
        return(
            <div>
                <form onSubmit={this.onSubmit}>
<input name='username' type='text' value={username} onChange={this.changeHandler}/>
<input name='password' type='password' value={password} onChange={this.changeHandler}/>
<button type='submit'>Login</button>
                </form>
            </div>
        )
    }
}