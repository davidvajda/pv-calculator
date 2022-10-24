import React, {useState, useEffect} from "react";
import { redirect } from "react-router-dom";
import axios from "axios"

const checkAdminPassword = (password) => {
    axios.post('/auth', {
        "password": password
      })
      .then((response) => {
        if (response.status === 400) {
            return redirect("/")
        }
      })
      .catch((error) => {
        throw error;
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