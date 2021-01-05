import React, { Component } from 'react'
import s from './Header.module.css'
import logo from '../img/logo.png'
import { NavLink } from 'react-router-dom';

export default class Header extends Component{
    constructor(){
        super()
        this.state ={
            logged: false
        }
    }


componentDidMount(){
    const storage = localStorage.getItem('jwtToken')
  if(storage){
      this.setState({logged: true})
  }
}

render(){
    if(!this.state.logged){
    return(
        <div>
        <div className={s.headerWrapper}>
        <nav className={s.navbar}>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/list'>List</NavLink>
            </nav>
        <nav className={s.navbar2}>
        <NavLink to='/login'>Login</NavLink>
            <NavLink to='/register'>Register</NavLink>
        </nav>
        </div>
        </div>
            );

}else {
    return(
        <div>
        <div className={s.headerWrapper}>
        <nav className={s.navbar}>
            <NavLink to='/home'>Home</NavLink>
            <NavLink to='/list'>List</NavLink>
            </nav>
            <nav className={s.navbar2}>
        <NavLink to='/logout'>Logout</NavLink>
        </nav>
        </div>
        </div>
    )
}
}
}