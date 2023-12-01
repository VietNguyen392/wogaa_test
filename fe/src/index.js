import React from "react";
import ReactDOM from "react-dom";
import {Provider}from 'react-redux';
import './styles/Css/index.css'
import './styles/Sass/style.scss'
import App from './App'

ReactDOM.render(
    <React.StrictMode>
    <App/>
    </React.StrictMode>,
    document.getElementById("root")
)