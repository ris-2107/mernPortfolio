import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { BsGithub, BsYoutube, BsInstagram, BsLinkedin } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Typography variant="h5">About Me</Typography>
        <Typography>
          Hey, my name is Rishabh Sinha. I am a Full-Stack Developer and an
            Electronics and Communications Engineer
        </Typography>

        <Link to="/contact" className="footerContactBtn">
          <Typography>Contact Me</Typography>
        </Link>
      </div>
      <div>
        <Typography variant="h6">Social Accounts</Typography>
        <a href="https://github.com/ris-2107" target="black">
          <BsGithub />
        </a>
        <a href="https://www.instagram.com/ris_2107/" target="black">
          <BsInstagram />
        </a>
        <a href="www.linkedin.com/in/rishabh-sinha-2107" target="black">
          <BsLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Footer;
