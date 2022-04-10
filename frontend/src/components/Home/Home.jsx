import React, { useEffect } from 'react'
import "./home.css"
import * as THREE from 'three';
//import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import venusImage from '../../Images/venus.jpg'
import moonImage from '../../Images/moon.jpg'
import spaceImage from '../../Images/space.jpg'
import {Typography, Button} from '@mui/material'
import TimeLine from "../TimeLine/TimeLine"
import { Link } from 'react-router-dom';
import {
  SiCplusplus,
  SiReact,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiCss3,
  SiHtml5,  
  SiThreedotjs,
 
} from "react-icons/si";
import {BsArrowDownShort} from "react-icons/bs";


const Home = ({ timelines, skills}) => {

  useEffect(() => {

    const TextureLoader= new  THREE.TextureLoader();


    const moonTexture = TextureLoader.load( moonImage)
    const venusTexture = TextureLoader.load( venusImage)
    const spaceTexture = TextureLoader.load( spaceImage)

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(3,2,8);

    const canvas=document.querySelector(".homeCanvas");
    const renderer = new THREE.WebGLRenderer({canvas});


    
    const moonGeometry = new THREE.SphereGeometry(2,64,64);
    const moonMaterial = new THREE.MeshStandardMaterial({map:moonTexture});
    const moon = new THREE.Mesh(moonGeometry,moonMaterial);

    const venusGeometry = new THREE.SphereGeometry(3,64,64);
    const venusMaterial = new THREE.MeshBasicMaterial({map:venusTexture});
    const venus = new THREE.Mesh(venusGeometry,venusMaterial);
    venus.position.set(7,4,6)


    


    const pointLight= new THREE.PointLight(0xffffff, 1);
    const pointLight2= new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.set(8,5,5);
    pointLight2.position.set(-8,-5,-5);

    //const lightHelper = new THREE.PointLightHelper(pointLight);
    


    //const controls=new OrbitControls(camera, renderer.domElement);
    scene.add(moon);
    //scene.add(lightHelper)
    scene.add(venus)
    scene.add(pointLight)
    scene.add(pointLight2);
    scene.background=spaceTexture;

    const constSpeed=0.01;
    window.addEventListener("mousemove",(e)=>{
      if(e.clientX <= window.innerWidth/2){
        moon.rotation.x-= constSpeed;
        moon.rotation.y+= constSpeed;
        venus.rotation.x-= constSpeed;
        venus.rotation.y+= constSpeed;
      }

      if(e.clientX > window.innerWidth/2){
        moon.rotation.x-= constSpeed;
        moon.rotation.y-= constSpeed;
        venus.rotation.x-= constSpeed;
        venus.rotation.y-= constSpeed;
      }
      if(e.clientY > window.innerHeight/2){
        moon.rotation.x-= constSpeed;
        moon.rotation.y+= constSpeed;
        venus.rotation.x-= constSpeed;
        venus.rotation.y+= constSpeed;
      }
      if(e.clientY <= window.innerHeight/2){
        moon.rotation.x-= constSpeed;
        moon.rotation.y-= constSpeed;
        venus.rotation.x-= constSpeed;
        venus.rotation.y-= constSpeed;
      }
    })

    
    const animate =()=>{
      requestAnimationFrame(animate)
      moon.rotation.y +=0.009;
      venus.rotation.y +=0.0002;
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    }

    animate()
    return window.addEventListener("scroll", () => {
      camera.rotation.z = window.scrollY * 0.001;
      camera.rotation.y = window.scrollY * 0.003;
  
      const skillsBox = document.getElementById("homeskillsBox");
  
      if (window.scrollY > 1200) {
        skillsBox.style.animationName = "homeskillsBoxAnimationOn";
      } else {
        skillsBox.style.animationName = "homeskillsBoxAnimationOff";
      }
    });

  }, [])



  return (
    <div className='home'>
      
      <div className="homeContainer"> 
      
      <canvas className="homeCanvas"></canvas>
      <div className="homeCanvasContainer">
        

      </div>
      <Typography className='blink' style={{alignItems:"center"}} variant="subtitle1" color="textSecondary" gutterBottom><BsArrowDownShort style={{fontSize:"7rem", color:"#aeaeae", position:"absolute", top:"52%", bottom:"44%", left:"47%", right:"50%"}}/></Typography>
      
      
        <Typography variant="h3">TIMELINE</Typography>
        {timelines && (<TimeLine timelines={timelines}/>)}
        {!timelines && (<TimeLine timelines={[1,2,3]}/>)}
        <a href='https://drive.google.com/file/d/12kQXcchjvXooI2U6pj1cwe8MRhuTKLi3/view?usp=sharing' 
        rel="noreferrer" target="_blank" style={{textDecoration:"none"}}>
        <Button  variant="contained" color="primary" className='btnRes' 
        style={{display:"inline",justifyContent:"center",marginTop:"4rem",left:"43%", fontSize:"2.15rem"}} > My Resume </Button></a>
      </div>
      
      <div className="homeSkills">
        <Typography variant="h3">SKILLS</Typography>
        <div className="homeCubeSkills">

          <div className="homeCubeSkillsFaces homeCubeSkillsFace1">
          {!skills.image1&&(<img  src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6' 
             alt='Face1'/>)}
          {skills.image1&&(<img  src={skills.image1.url} alt='FACE1'/>)}
             
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace2">
            {skills.image2&&(<img src={skills.image2.url} alt='Face2'/>)}
            {!skills.image2 && (<img src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6'
             alt='Face2'
             />)}
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace3">
            {!skills.image3 && (<img src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6'
             alt='Face3'
             />)}
             {skills.image3 && (<img src={skills.image3.url} alt='Face3'/>)}
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace4">
          {!skills.image4 && (<img src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6'
             alt='Face4'
             />)}
             {skills.image4 && (<img src={skills.image4.url} alt='Face4'/>)}
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace5">
          {!skills.image5 && (<img src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6'
             alt='Face5'
             />)}
             {skills.image5 && (<img src={skills.image5.url} alt='Face5'/>)}
          </div>
          <div className="homeCubeSkillsFaces homeCubeSkillsFace6">
          {!skills.image6 && (<img src='https://static.theprint.in/wp-content/uploads/2021/11/debris-1.jpg?compress=true&quality=80&w=376&dpr=2.6'
             alt='Face6'
             />)}
             {skills.image6 && (<img src={skills.image6.url} alt='Face6'/>)}
          </div>
        </div>

        <div className="cubeShadow"></div>
        <div className="homeskillsBox" id="homeskillsBox">
          <SiCplusplus />
          <SiHtml5 />
          <SiCss3 />
          <SiJavascript />
          <SiMongodb id="mongoicon"/>
          <SiExpress id="expicon" />
          <SiReact id="reacticon"/>
          <SiNodedotjs id="nodeicon"/>
          <SiThreedotjs />
        </div>
      </div>
      
    </div>

  )
}

export default Home