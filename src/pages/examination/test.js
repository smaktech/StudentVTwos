import React from 'react';
import logo from './image/geogebra-export.png'; // Tell webpack this JS file uses this image

console.log(logo); // /logo.84287d09.png

function test2() {
  // Import result is the URL of your image
  return <img src={logo} />;
}

export default test2;