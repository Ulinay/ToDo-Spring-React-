import { Component } from "react";

export default function Logout(){
    localStorage.clear();
    window.location.href = '/';
}