import React,{useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import {Avatar, ChatEngine} from 'react-chat-engine';
import {auth} from '../Firebase';
import axios from 'axios';

import {useAuth} from "../contexts/AuthContext";

const Chats= () => {
   const history = useHistory();
   const {user} = useAuth();
   const [loading,setLoading]=useState(true);
    const handleLogout = async()=>{
        await auth.signOut();
        history.push('/')
    } 

    const getFile = async(url)=>{
        const response =await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg",{type:'image/jpeg'})
    }
    useEffect(()=>{
        if(!user){
            history.push('/');

            return;
        }
           axios.get('https://api.chatengine.io/users/me',{
           headers: {
               "project-id":"5937dfb3-2c64-4b04-b8c3-fc5aa69296cd",
                "user-name": user.email,
               "user-secret":user.uid,
           }
           })
           .then((result) => {
               setLoading(false);
           }).catch((err) => {
               let formdata = new FormData();
               formdata.append('email',user.email);
               formdata.append('username',user.email);
               formdata.append('secret',user.uid);

               getFile(user.photoURL)
                .then((Avatar)=>{
                    formdata.append('avatar',Avatar,Avatar.name)

                    axios.post('https://api.chatengine.io/users',
                    formdata,
                    { headers:{"private-key":"06fc608f-796a-489f-8ecc-beda4c2e1f46"}})
                    .then(()=> setLoading(false))
                    .catch((error)=>console.log(error))
                })
            })
    },[user,history]);

    if(!user || loading) return 'Loading...';


    return(
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Let's Chat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
                </div>
                <ChatEngine
                height="calc(100vh - 66px)"
                margin-top="66px"
                projectID="5937dfb3-2c64-4b04-b8c3-fc5aa69296cd"
                userName={user.email}
                userSecret={user.uid}
                />
            
        </div>
    )
}

export default Chats;
