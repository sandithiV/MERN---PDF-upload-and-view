import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './Register.css';

export default function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
    })

 const registerUser = async (e) => {
    e.preventDefault();
    const {firstname, lastname, email, password} = data
    try {
      const {data} = await axios.post('/register', {
        firstname, lastname, email, password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Registration Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
     console.log(error)
    }
 } 

  return (
    <div className="register-container">
            <div className="register-card">
                <form onSubmit={registerUser}>
                    <h2>Register</h2>
                    <label>First Name</label>
                    <input 
                        type='text' 
                        placeholder='Enter first name...' 
                        value={data.firstname} 
                        onChange={(e) => setData({ ...data, firstname: e.target.value })} 
                        required 
                    />

                    <label>Last Name</label>
                    <input 
                        type='text' 
                        placeholder='Enter last name...' 
                        value={data.lastname} 
                        onChange={(e) => setData({ ...data, lastname: e.target.value })} 
                        required 
                    />

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

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
  );
}
