import React, { useState } from "react";
import { loginWithGithyb, logout, register } from '../api/firebase';
import { uploadImage } from "../api/cloudinary";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({email:'', password:'', name:'', photo:''});
  const [file, setfile] = useState();
  const [user, setUser] = useState();
  const handleChange = e => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value});
  }
  const handleSubmit = e => {
    e.preventDefault();
    register(userInfo).then(setUser);
  }
  const handleGithub = e => {
    loginWithGithyb().then(setUser);
  }
  const handleLogout = e => {
    logout().then(setUser);
  }
  const handleUpload = e => {
    setfile(e.target.files && e.target.files[0]);
    uploadImage(file)
      .then(url => setUserInfo({...userInfo, ['photo']: url}));
  }
  // .then = 결과를 불러올때 사용하는 것

  return (
    <div style={{margin: '20px'}}>
      <form onSubmit={handleSubmit}>
        <input type="email" name='email' value={userInfo.email} placeholder="이메일"
          onChange={handleChange} /><br />
        <input type="password" name='password' value={userInfo.password} placeholder="패스워드"
          onChange={handleChange} /><br />  
        <button onClick={handleSubmit}>사용자 등록</button>
        <button onClick={handleLogout}>로그아웃</button>
      </form> <br /><br />
        <button onClick={handleGithub}>깃허브 로그인</button>
      {user && <p>accessToken={user.accessToken}</p>}
      {user && <p>email={user.email}</p>}
      {user && <p>uid={user.uid}</p>}
      {user && user.displayName && <p>uid={user.displayName}</p>}
      {user && user.photoURL && (
        <img src={user.photoURL} alt={user.displayName} width={200} />
      )}  
    </div>
  )
}