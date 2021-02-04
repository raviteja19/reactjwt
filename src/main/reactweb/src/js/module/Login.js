import  React,{useEffect,useState} from 'react';
import {setCookie} from './Helper';
import Axios from 'axios';

const Login =(props)=>{

const [username,setUserName]=useState('');
const [password,setPassword]=useState('');
const [required,setrequired]=useState(false);
const [authentication,setAuthentication]=useState(false);

useEffect(()=>{
console.log("hello")
},[])


const  SubmitLogin=(e)=>{
   e.preventDefault();
   e.preventDefault();
   console.log(props) 
   let form=document.getElementById('loginbox')
   let data={username,password};
//    data=JSON.parse(JSON.stringify(data));
//    const data = new FormData()
//    data.append("username",username);
//    data.append("password",password)

Axios.post("/authenticate",data)
      .then(v => {
        setCookie("mytoken",v.data.token);
        setAuthentication(false);
        props.history.push('/data');
      })
      .catch(e => {
        setAuthentication(true);
         
          console.warn(e)
      })

}

const setUservalues=(e)=>{
    let id=e.target.id;
    let val=e.target.value;
    console.log(val)
    if(id=="username")
        setUserName(val);

     if(id=="password")
        setPassword(val);   

}

    return(
        <div className="logins">
            <div className="login">
            <div></div>
            <div className="box">
                <form  id="loginbox" onSubmit={SubmitLogin}>
                        <div className="form-group">
                            <label htmlFor="email">Username:</label>
                            <input type="text" className="form-control" id="username" style={{width:'90%'}}
                            placeholder="Enter username" name="username" value={username} onChange={setUservalues}  />
                            <label style={{color:'red',fontWeight:'300',display:(username==''&&required)?'block':'none'}}>Username required</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password:</label>
                            <input type="password" className="form-control" id="password"  style={{width:'90%'}}
                             placeholder="Enter password" name="password" value={password} onChange={setUservalues}/>
                            <label style={{color:'red',fontWeight:'300',display:(password==''&&required)?'block':'none'}}>Password required</label>
                        </div>
                        <div className="checkbox">
                            <label style={{color:'red',fontWeight:'300',display:(authentication)?'block':'none'}}>Authentication failed.Please try again</label>
                        </div>
                        <button type="submit" className="btn btn-success" onClick={SubmitLogin}>Sign in</button>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login ;