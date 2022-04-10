import { Button, Typography } from "@mui/material";
import { useSnackbar } from 'notistack';
import { CircularProgress,Stack,Box } from '@mui/material';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Contact.css";
import {contactUs} from "../../actions/user"

const Contact = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const{loading, message:alertMessage, error} = useSelector(state => state.update);

    const contactFormHandler = (e) => {
        e.preventDefault();
        dispatch(contactUs(name, email, message));
    }

        useEffect(() => {
            if(error){
               enqueueSnackbar(error, {variant: 'error'});
                dispatch({type: "CLEAR_ERROR"});
            }
            if(alertMessage){
                enqueueSnackbar(alertMessage, {
                    variant: 'success',
                    autoHideDuration: 2250,
                });
                dispatch({type: "CLEAR_MESSAGE"});
            }
        }, [error, alertMessage, enqueueSnackbar, dispatch]);
        
    

  return (
    <div className="contact">
        <div className="contactRightbar">

        </div>
        <div className="contactContainer">
            <form className="contactContainerForm" onSubmit={contactFormHandler}>
                <Typography variant="h3">Contact Me 🤗</Typography>
                <input type="text" required placeholder="Your Name please..." value={name} onChange={(e)=>{setName(e.target.value)}} />
                <input type="email" required placeholder="Your Email here..." value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                <textarea required placeholder="Your Message to me..." cols="30" rows="10" value={message} onChange={(e)=>{setMessage(e.target.value)}}></textarea>
                {!loading &&(<Button variant="contained" type="submit"> Send Message </Button>)}
                {loading && (<Stack sx={{color:"#FF6700",alignItems:"center", justifyContent:"center", marginTop:"0.7rem"}} spacing={1} direction="row"> <CircularProgress size="2.25rem" color="inherit"/></Stack>)}
            </form> 
        </div>
    </div>
  )
}

export default Contact