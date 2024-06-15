import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loader from "../assets/loader.gif"
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { Buffer } from 'buffer';
import { setAvatarRoute } from '../utils/APIRouter';
export default function SetAvatar() {
    const api = 'https://api.multiavatar.com/45678945'
    const navigate = useNavigate();
    const [avatars, SetAvatars] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [selectedAvatar, setselectedAvatar] = useState(undefined);
    const toastOption = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
    };
    const setProfilePicture = async () => {
        if(selectedAvatar===undefined){
            toast.error("Please select an avatar",toastOption)
        }
        else{
            const user =await JSON.parse(localStorage.getItem("chat-app-user"));
            const {data} =await axios.post(`${setAvatarRoute}/${user._id}`,{
                image :avatars[selectedAvatar]
            })
            if(data.isSet){
                user.isAvatarImageSet =true;
                user.isAvatarImage =data.image;
                localStorage.setItem("chat-app-user",JSON.stringify(user));
                navigate('/')
            }else{
                toast.error("Error setting avatar .Please Try Again")
            }
        }
    }
    const doSomething = async () => {
        try {
            const data = [];
            for (let i = 0; i < 4; i++) {
                const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                const buffer = Buffer.from(image.data);
                data.push(buffer.toString("base64"));
            }
            SetAvatars(data);
            setisLoading(false);
        } catch (error) {
            console.error("Error fetching avatars:", error);
            setisLoading(false); // Ensure isLoading is set to false even in case of an error
        }
    };

    useEffect(() => {
        doSomething();
    }, []);
    return (

        <div>
        {
            isLoading ?<Container>
                <img src={loader} alt='loading img' className='loader'></img>
                </Container>:""
        }
            <Container>
                <div className='title-container'>
                    <h1>Pick an avatar as your picture</h1>
                </div>
                <div className='avatars'>
                    {
                        avatars.map((avatar, index) => {
                            return (<>
                                <div className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>

                                    <img src={`data:image/svg+xml;base64,${avatar}`} alt='avatar' onClick={() => { setselectedAvatar(index) }}></img>
                                </div>
                            </>
                            )
                        })

                    }

                </div>
                <button className='submit-btn' onClick={setProfilePicture}>Set as Profile Picture</button>
            </Container>
            <ToastContainer></ToastContainer>
        </div>
    )
}

const Container = styled.div`
  display:flex;
  justify-content :center;
  align-items:center;
  flex-direction:column;
  gap: 3rem;
  background-color: #131324;
  height:100vh;
  width: 100vw;
  .loader{
    max-inline-size:100%;
  }
  .title-container {
    h1{
        color:white;

    }
  }
    .avatars {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:2rem;
        .avatar{
            border: 0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            align-items:center;
            justify-content:center;
            transition: 0.5s ease-in-out;
            img{
                height:6rem;
            }
        }
        .selected{
            border:0.4rem solid #4e0eff
        }
    }
    button{
      background-color:#997af0;
      color:white;
      width:50%;
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
    

`;
