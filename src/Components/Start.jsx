import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Start = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        axios.get('http://localhost:4000/verify')
        .then(result => {
            if(result.data.Status) {
                    navigate('/dashboard')
            }
        }).catch(err =>console.log(err))
    }, [])

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-25 border loginForm">
        <h2 className="text-center">Vibeconn Technologies</h2>
        <p className="text-center">Only Admin can login</p>
        <div className="d-flex justify-content-center mt-4 mb-2">
          {/* <button type="button" className="btn btn-primary" onClick={() => {navigate('/employee_login')}}>
            Employee
          </button> */}
          <button type="button" className="btn btn-success w-100 " onClick={() => {navigate('/adminlogin')}}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;