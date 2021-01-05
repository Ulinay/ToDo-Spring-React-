import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import s from './List.module.css'

export default class List extends Component{
  yourConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('jwtToken')
    }
  }
constructor(){
    super()
    this.state = {
        posts: [],
        article: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmitHandler = this.onSubmitHandler.bind(this)
}
componentDidMount(){
    const yourConfig = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('jwtToken')
        }
      }
      
            axios.get('http://localhost:8080/api/v1/getlist',this.yourConfig)
              .then(res => {
                const posts = res.data;
                this.setState({ posts });
              })
}

onSubmitHandler(e){
  e.preventDefault()
  const {article} = this.state;
  const post = {
    article: article
      }
 
  axios.post('http://localhost:8080/api/v1/addpost',post,this.yourConfig).then(res =>{
    const response = res.data;
  })
window.location = '/list'
}

onChange(e){
  this.setState({[e.target.name]:e.target.value})
}


handleClick(e){
  const index = this.state.posts.indexOf(e);
  var array = [...this.state.posts]; // make a separate copy of the arra
    array.splice(index, 1);
    this.setState({posts: array});
axios.post('http://localhost:8080/api/v1/deletepost',e,this.yourConfig).then(resp =>{
  console.log(resp)
});
}

render() {
  const {article} = this.state;
 
    if(localStorage.getItem('jwtToken')){
    return (
      <div>
      <ul>
        { this.state.posts.map(post => <li>
          {post.article}
          <button type='submit' onClick={this.handleClick.bind(this,post)}>delete</button>
        </li>)}
      </ul>
      <form onSubmit={this.onSubmitHandler}>
<input type='text' value={article} name='article' onChange={this.onChange}/>
<button type='submit'>Add</button>
      </form>
     </div>
      
    );
}else {
    return(
        <div className={s.pleaselogin}>
        <h1>Please login</h1>
        <Link to='/login'>
<p>Login</p>
            </Link>
    </div>
    )
}


}
}