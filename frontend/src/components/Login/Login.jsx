import React,{useState, useEffect} from 'react'
import "./Login.css";
import { useSnackbar } from 'notistack';
import { Button, Typography } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux'
import {login } from "../../actions/user"
import { CircularProgress,Stack } from '@mui/material';
const Login = () => {


    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    const dispatch = useDispatch()
    const {loading, message, error}=useSelector((state)=>state.login)
    //console.log(loading, message, error)
    


   const { enqueueSnackbar } = useSnackbar();
   const submitHandler = (e) => {
        e.preventDefault();
        dispatch (login(email, password ))

    }

    useEffect(() => {


        if(error){
            enqueueSnackbar(error, {
                variant: 'error',
                autoHideDuration: 1250,
            });
        dispatch({type: "CLEAR_ERRORS", payload: null})
        }

        if(message){
                enqueueSnackbar(message, {
                    variant: 'success',
                    autoHideDuration: 1250,
                });
                dispatch({type: "CLEAR_MESSAGE", payload: null})
            }
         
    }, [ error, message, enqueueSnackbar, dispatch ]);

  return (
   <div className="login">
       <div className="loginContainer">
           <form className="loginForm" onSubmit={submitHandler}>
               <Typography variant='h4'>
                <p>A</p>
                <p>D</p>
                <p>M</p>
                <p>I</p>
                <p style={{ marginRight: "1vmax" }}>N</p>

                <p>P</p>
                <p>A</p>
                <p>N</p>
                <p>E</p>
                <p>L</p>
               </Typography>
               <div>
                   <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Admin Email" />
                   <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Admin Password" />
                   {!loading &&(<Button variant="contained" type="submit" >Login</Button>)}
                   {loading && (<Stack sx={{color:"#FF6700",alignItems:"center", justifyContent:"center", marginTop:"1.8rem"}} spacing={1} direction="row"> <CircularProgress size="1.6rem" color="inherit"/></Stack>)}
               </div>
               
               
               
           </form>
       </div>
   </div>
  )
}

export default Login