import React, { useState, useEffect } from "react";
//import { useAlert } from "react-alert";
import {useSnackbar} from "notistack"
import { useDispatch, useSelector } from "react-redux";
import { addProject, getUser } from "../../actions/user";
import { MdKeyboardBackspace, MdCheckCircle } from "react-icons/md";
import { Button, Typography } from "@mui/material";
import Stack from "@mui/material/Stack"
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ProjectCard } from "../Projects/Projects";

const Project = () => {
  const { message, error, loading } = useSelector((state) => state.update);
  const { message: loginMessage } = useSelector((state) => state.login);

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [isUploaded, setIsUploaded] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    await dispatch(addProject(title, url, image, description, techStack));
    dispatch(getUser());
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if(file) setIsUploaded(true);
    const Reader = new FileReader();

    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error, { variant: "error" });
      dispatch({ type: "CLEAR_ERRORS" });
    }
    if (message) {
      enqueueSnackbar(message, { variant: "success" });
      dispatch({ type: "CLEAR_MESSAGE" });
    }
    if (loginMessage) {
     enqueueSnackbar(loginMessage, { variant: "success" });
      dispatch({ type: "CLEAR_MESSAGE" });
    }
  }, [enqueueSnackbar, error, message, dispatch, loginMessage]);

  return (
    <div className="adminPanel">
      <div className="adminPanelContainer">
        <Typography variant="h4">
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

        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="adminPanelInputs"
          />
          <input
            type="text"
            placeholder="Link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="adminPanelInputs"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="adminPanelInputs"
          />

          <input
            type="text"
            placeholder="Technologies"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
            className="adminPanelInputs"
          />
          {!isUploaded ? (<input
            type="file"
            onChange={handleImage}
            className="adminPanelFileUpload"
            accept="image/*"
          />):(<div style={{display:"flex"}}>
              
             <Typography variant="h6">
                File Chosen..
            </Typography> <MdCheckCircle style={{marginRight:"2vmax",marginTop:"0.22rem",color:"green", fontSize:"1.75rem"}}/>
          </div>)}


          <Link to="/account">
            BACK <MdKeyboardBackspace />
          </Link>

          {!loading && (<Button type="submit" variant="contained">
            Add
          </Button>)}

          {loading && (<Stack sx={{color:"#FF6700",alignItems:"center", justifyContent:"center", marginTop:"1.8rem"}} spacing={1} direction="row"> <CircularProgress size="2.6rem" color="inherit"/></Stack>)}

        </form>

        <div className="adminPanelYoutubeVideos">
          {user &&
            user.projects &&
            user.projects.map((item) => (
              <ProjectCard
                id={item._id}
                key={item._id}
                url={item.url}
                projectImage={item.image.url}
                projectTitle={item.title}
                description={item.description}
                technologies={item.techStack}
                isAdmin={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Project;
