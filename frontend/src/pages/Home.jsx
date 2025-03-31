import React from 'react';
import '../css/Home.css' 

const Home = () => {
  return (
    <div className="vcontainer">
      <video autoPlay loop muted playsInline className="backgroundVideo">
        <source src="https://videos.pexels.com/video-files/853958/853958-hd_1920_1080_30fps.mp4" type="video/mp4" /></video>
      <div className="heroTitle">
        <h1>SHOE-VERSE</h1>
        <p>Your Own University Of Shoes</p>
      </div>
    </div>
  );
};

export default Home;
