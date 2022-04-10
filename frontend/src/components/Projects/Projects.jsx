import { IconButton, Typography } from "@mui/material";
import React from "react";
import "./Projects.css";
import { AiOutlineProject } from "react-icons/ai";
import Box from "@material-ui/core/Box";
import DeleteIcon from '@mui/icons-material/Delete'
import { FaRegSmileWink } from "react-icons/fa";
import { deleteProject, getUser } from "../../actions/user";
import { useDispatch } from "react-redux";

export const ProjectCard = ({
  url,
  projectImage,
  projectTitle,
  description,
  technologies,
  isAdmin = false,
  id
}) => {

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await dispatch(deleteProject(id));
    dispatch(getUser());
  };

  return (
    <>
      <a href={url} className="projectCard" target="black">
        <div>
          <img src={projectImage} alt="Project" />
          <Typography variant="h5">{projectTitle}</Typography>
        </div>
        <div>
          <Typography style={{padding:"1.5rem", fontSize:"4.2rem"}} variant="h3"> About Project </Typography>
          <Box><Typography style={{padding:"1.7rem"}} variant="h6">{description}</Typography> </Box>
          <Typography style={{paddingLeft:"1.6rem"}} variant="h6">Tech Stack:  {technologies}</Typography>
        </div>
      </a>

      {isAdmin && (
        <IconButton aria-label="delete" onClick={()=> {deleteHandler(id)}}>
        <DeleteIcon />
      </IconButton>
      )}
    </>
  );
};

const Projects = ({projects}) => {
 
  return (
    <div className="projects">
      <Typography variant="h3">
        Projects <AiOutlineProject />
      </Typography>

      <div className="projectsWrapper">
        {
          projects.map((item) => (
            <ProjectCard
            id={item._id}
            key={item._id}
            url={item.url}
            projectImage={item.image.url}
            projectTitle={item.title}
            description={item.description}
            technologies={item.techStack}
            isAdmin={true} />
            ))
        }
      </div>

      <Typography variant="h3" style={{ font: "100 1.2rem 'Ubuntu Mono'" }}>
        All The Projects Shown Above Are Made By Me <FaRegSmileWink />
      </Typography>
    </div>
  );
};

export default Projects;
