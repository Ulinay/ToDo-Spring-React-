import { Component } from "react"
import axios from 'axios'
import { Redirect } from "react-router"

class Register extends Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            warning: ''
        }
this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)

    }

handleSubmit(e){
    e.preventDefault()
    if(this.state.username.length < 6 || this.state.password.length < 6){
        this.setState({warning:'Password and username should be more than 6 symbols'})
    }else {
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        this.setState({warning:''})
        axios.post('http://localhost:8080/api/v1/adduser',user).then(resp =>{
if(resp.data === 200){
    window.location = '/home'
}else {
    this.setState({warning: 'Username already exists'})
}
    })
        
    }
}
handleChange(e){
    this.setState({[e.target.name]:e.target.value})
}

    render(){
        const {username, password} = this.state
    return(
<div>
    <form onSubmit={this.handleSubmit}>
        <input type='text' name='username' value={username} onChange={this.handleChange}/>
        <input type='password' name='password' value={password} onChange={this.handleChange}/>
        <button type='submit'>Register</button>
    </form>
    {this.state.warning}
</div>

    );
    }
}

export default Register