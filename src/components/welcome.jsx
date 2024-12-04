import React from 'react';

const Welcome = ({showloginhandler}) => {
  return (
    <div className="hero">
      <h1>Welcome to Our Platform!</h1>
      <p>Your journey to better service starts here. Join us today to experience great products and services.</p>
      <button onClick={() => {alert('Getting Started!')
        showloginhandler()
      }}>Get Started</button>
    </div>
  );
};

export default Welcome;
