import React from 'react';
import '../css/Home.css';
import logo from '../media/logo.png';
import video from '../media/853958-hd_1920_1080_30fps.mp4';

const Home = () => {
  return (
    <div className="vcontainer">
      <video autoPlay loop muted playsInline className="backgroundVideo" src={video} />
      <div className="heroTitle">
        <img src={logo} alt="" height={100} width={180} />
        <h1>SHOE-VERSE</h1>
        <p>Where Every Step Matters.</p>
      </div>
    </div>
  );
};

export default Home;
