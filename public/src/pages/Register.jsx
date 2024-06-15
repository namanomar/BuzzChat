import React, { useState, useEffect } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import Logo from '../assets/logo.svg';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { registerRoute } from '../utils/APIRouter';
function Register() {
  const navigate =useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const toastOption = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark"
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handlevalidatation()) {
      const { username, email, password, confirmPassword } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg,
          toastOption);
      }
      if (data.status === true) {
        localStorage.setItem('chat-app-user',JSON.stringify(data.user))
        navigate("/");
      }
    }
  }
  const handlevalidatation = () => {
    const { username, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password are not same.",
        toastOption);
      return false;
    }
    else if (username.length < 3) {
      toast.error("Username should be greater than 3 number",
        toastOption);
      return false;
    }
    else if (email === "") {
      toast.error("Email is required",
        toastOption);
      return false;
    }
    return true;
  }

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt="my_logo" />
            <h1>snappy</h1>
          </div>
          <input type="text" placeholder='Username' name="username" onChange={(e) => handleChange(e)}></input>
          <input type="email" placeholder='Email' name="email" onChange={(e) => handleChange(e)}></input>
          <input type="password" placeholder='Password' name="password" onChange={(e) => handleChange(e)}></input>
          <input type="password" placeholder='Confirm Password' name="confirmPassword" onChange={(e) => handleChange(e)}></input>
          <button type="submit">Create User</button>
          <span>Already have an account? <a href="/login">Login</a></span>
        </form>
      </FormContainer>
      <ToastContainer></ToastContainer>
    </div>
  )
}

const FormContainer = styled.div`
 height:100vh;
 width:100vw;
 display:flex;
 flex-direction:column;
 justify-content:center;
 gap:1rem;
 align-items:center;
 background-color:#131324;
 .brand{
  display:flex;
  align-items:center;
  gap:1rem;
 }
  img{
    height:5rem;
  }
  h1{
    color:white;
    text-transform:uppercase;
  }
  form{
    display :flex;
    flex-direction:column;
    gap:2rem;
    background-color:#00000076;
    border-radius:2rem;
    padding:3rem 5rem;
    input{
      background-color:transparent;
      padding:1rem;
      border:0.1rem solid #4e0eff;
      border-radius:0.4rem;
      color:white;
      width:100%;
      font-size:1rem;
      &:focus{
         border:0.1rem solid #997af0;
         outline:none
      }
    }
    button{
      background-color:#997af0;
      color:white;
      width:100%;
      padding:1rem 2rem;
      border:none;
      font-weight:bold;
      cursor:pointer;
      border-radius:0.4rem;
      font-size:1rem;
      text-transform:uppercase;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color:#4e0eff;
      }
    }
    span{
      color:white;
      text-transform:uppercase;
      a{
        color:#4e0eff;
        text-decoration:none;
        font-weight:bold;
      }
    }
  }
  
`;



export default Register
