import { Link } from "react-router-dom";
import React from "react";
import "./Intro.css";
const Intro = () => {
  return (
    <div>
      <button className="Intro">
        <Link to="/recipes" className="#b">
          INTRO
        </Link>
      </button>
    </div>
  );
};
export default Intro;
