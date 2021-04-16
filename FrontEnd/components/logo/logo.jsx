import React from "react";

const Logo = (props) => {
  const url =
    "https://raw.githubusercontent.com/braucalderon/jsonFiles/main/ohioTranspImg/logo.png";
  const logo = <img alt="logo" src={url} height='110' width='150' />;
  

  return logo;
};
export default Logo;
