import React, {useState, useContext} from 'react'
import alertContext from "../Contexts/AlertContexts/alertContext";
import { useNavigate  } from 'react-router-dom'

function Login() {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    let navigate = useNavigate();
    let {showAlert}= useContext(alertContext);
    const hostName = "http://localhost:5000";

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const onSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch(`${hostName}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
              
            },
           
            body: JSON.stringify({email:credentials.email, password:credentials.password}), // body data type must match "Content-Type" header
          });
           const json = await response.json(); 
           if(json.success){
            console.log(json.authtoken);
             localStorage.setItem('jwttoken',json.authtoken)
             navigate('/');
             showAlert('success' ,'LoggedIn Successfully')
           }
           else{
            showAlert('danger' ,'Invalid Credentials')
           }

    }
     
    return (
        <div className='container'>
            <h2>Login to Access i-Notebook</h2>
            <form className='my-3' onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label"><strong>Email</strong></label>
                    <input type="email" className="form-control" name='email' id="email" value={credentials.email} onChange={onChange}  aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label"><strong>Password</strong></label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="password" />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login