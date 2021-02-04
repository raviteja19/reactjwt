import React from "react";
import { withRouter } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div>
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              {/* <button
                type="button"
                id="buttoniconnvarbar"
                className="navbar-toggle"
                data-toggle="collapse"
                data-target="#myNavbar">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button> */}
              <div className="navbar-brand applicationname">Jwt + React</div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default withRouter(Header);
