import React from "react"
import ReactDOM from "react-dom"

import "index.scss"

import Application from "components/Application"

import axios from "axios"

axios.defaults.baseURL = "https://interview-schedulerlhl.herokuapp.com/"

ReactDOM.render(<Application />, document.getElementById("root"))
