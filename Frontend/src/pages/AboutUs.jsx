import first from '../images/Recipe app.PNG';
import second from '../images/productivity dashboard.PNG';
import third from '../images/GitLookUp.PNG';
const AboutUs = () => {

  return (
    <div className="w-full h-fit ">
      <div className="aboutTopDiv w-full h-[80vh] flex items-center justify-center flex-col gap-6 relative ">
        <h1 className="text-6xl text-[var(--text-h)]">About me</h1>
        <h3 className="w-[75%] text-[var(--text-p)] text-center text-xl  ">
          Hi, I'm Aniket, a passionate web developer and a recent B.Tech
          Computer Science graduate (June 2025). I'm currently diving deep into
          Full Stack Web Development while sharpening my Data Structures &
          Algorithms skills to become a better problem solver. I genuinely enjoy
          building clean, functional, and visually appealing websites — just
          like this e-commerce platform. This project reflects my love for
          creating smooth user experiences and modern web designs. Thanks for
          visiting — more features and improvements are always on the way!
        </h3>
         <div className=' absolute bottom-7 flex gap-6 items-center justify-center w-full'>
          <button onClick={() => window.open("https://www.linkedin.com/in/aniketsharma09/", "_blank")} className='rounded-md hover:scale-99 active:scale-98 cursor-pointer px-3 py-2 bg-[var(--nav)] flex gap-3 items-center justify-center'><i className="text-2xl text-[var(--btn)] tracking-wider font-bold ri-linkedin-box-line"></i>
          <h2 className='text-xl text-[var(--btn)] tracking-wider font-bold '>Linkedin</h2></button>
          <button onClick={() => window.open("https://github.com/Aniketsharma09", "_blank")} className='rounded-md hover:scale-99 active:scale-98 cursor-pointer px-3 py-2 bg-[var(--nav)] flex gap-3 items-center justify-center'><i className=" text-2xl text-[var(--btn)] tracking-wider font-bold ri-github-line"></i>
          <h2 className='text-xl text-[var(--btn)] tracking-wider font-bold '>Github</h2></button> 
        </div>
        
      </div>
     
      <div className="aboutSecDiv bg-[var(--nav)] h-[90vh] w-full p-5 flex items-center justify-center ">
        <div className="secDivFirst w-[43%] h-full flex items-center justify-center flex-col gap-5">
        <h1 className="text-4xl font-extrabold tracking-widest text-[var(--text-h)]">My Major Project's</h1>
        <ol className=" list-decimal mt-2 text-[var(--text-p)]">
          <li className="text-xl mt-2">Recipe site using React</li>
          <li className="text-xl mt-2">Prayatna planner using html, css and js</li>
          <li className="text-xl mt-2">GitLookUp using html, css and js</li>
        </ol>
       
        </div>
        <div className="secDivSec w-[57%] h-[80%] gap-6 p-5 flex flex-wrap text-center justify-center ">
        <div className="w-[48%] h-[44%]">
          <img src={first} onClick={() => window.open("https://github.com/Aniketsharma09/AI-Powered-Cohort/tree/main/Recipe%20App", "_blank")} className="cursor-pointer h-[100%]  rounded-2xl w-[100%] object-cover "/>
        </div>
        <div className="w-[48%] h-[44%] ">
          <img src={second} onClick={() => window.open("https://github.com/Aniketsharma09/Prayatna-Planner", "_blank")} className="cursor-pointer h-[100%] rounded-2xl  w-[100%] object-cover "/>
        </div>
        <div className="w-[48%] h-[44%] ">
          <img src={third} onClick={() => window.open("https://github.com/Aniketsharma09/GitLookUp", "_blank")} className="cursor-pointer h-[100%]  rounded-2xl w-[100%] object-cover "/>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
