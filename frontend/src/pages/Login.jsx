import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './Login.css';

export default function Login() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const loginUser = async (e) => {
    e.preventDefault()
    const {email, password} = data

    try{
     const {data} = await axios.post('/login', {
      email,
      password
     }) ;
     if(data.error){
      toast.error(data.error)
     } else {
      setData({});
      navigate('/dashboard')
     }
    }catch (error) {
       
    }
  }
  return (
    <div className="login-body">
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={loginUser}>
          <h2>Login</h2>
          <label>Email</label>
          <input
            type='email'
            placeholder='Enter email...'
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='Enter password...'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </div>
    </div> 
  );
}
