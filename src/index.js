import React from "react"
import ReactDOM from "react-dom"

import "index.scss"

import Application from "components/Application"

import axios from "axios"
axios.defaults.baseURL = "https://interview-schedulerlhl.herokuapp.com/"
console.log("--->", process.env.REACT_APP_API_BASE_URL)
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL
}

ReactDOM.render(<Application />, document.getElementById("root"))
