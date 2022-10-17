import React, {useState, useEffect} from "react";
import axios from "axios"

const checkAdminPassword = (password) => {
    axios.post('/auth', {
        "password": password
      })
      .then(function (response) {
        console.log("response", response);
      })
      .catch(function (error) {
        console.log("error:", error);
      })
      .then(() => {
        console.log("idk")
      })
}

const SetupPage = () => {
    const servicePassword = prompt("Servisné heslo:")

    checkAdminPassword(servicePassword)

    const accessDenied = <div><h1>404</h1><p>Access denied, wrong password!</p></div>
    const setupPage = <div>setup page</div>
    return <></>
}

export default SetupPage;