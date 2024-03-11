import React, {useState,useContext} from 'react'
import { useNavigate  } from 'react-router-dom'
import alertContext from "../Contexts/AlertContexts/alertContext";

function Signup() {
    const hostName = "http://localhost:5000";
    let navigate = useNavigate();
    let {showAlert}= useContext(alertContext);
    const [credentials, setCredentials] = useState({name:"", email:"", password:""})
    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    } 
    const onSubmit = async(e)=>{
        e.preventDefault();
        const {name,email,password} = credentials
        const response = await fetch(`${hostName}/api/auth/createuser`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            
            headers: {
              "Content-Type": "application/json",
              
            },
           
            body: JSON.stringify({name, email, password}), // body data type must match "Content-Type" header
          });
           const json = await response.json(); 
           if(json.success){
            console.log(json.authtoken);
             localStorage.setItem('jwttoken',json.authtoken)
             navigate('/');
             showAlert('success' ,'Created User Successfully')
           }
           else{
            showAlert('danger' ,'Unable to create User')
           }
    } 

    return (
        <div className='container'>
            <h2>Sign Up to Access the i-Notebook</h2>
            <form className='my-3' onSubmit={onSubmit}>
            <div className="mb-3">
                    <label htmlFor="Name" className="form-label"><strong>Name</strong></label>
                    <input type="text" className="form-control" id="name" name='name' onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label"><strong>Email</strong></label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label"><strong>Password</strong></label>
                    <input type="password" className="form-control" id="password" name='password' required minLength={5} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="Confirm Password" className="form-label"><strong>Confirm Password</strong></label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' required minLength={5} onChange={onChange}/>
                </div>
                
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Signup