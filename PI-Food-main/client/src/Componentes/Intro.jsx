import { Link } from "react-router-dom";
import React from "react";
import "./Intro.css";
const Intro = () => {
  return (
    <div>
      <Link className="b" to="/recipes">
        HOME
      </Link>
    </div>
  );
};
export default Intro;
