import React from "react";
import PropTypes from "prop-types";

function Header({ text = "Notes App" }) {
  return (
    <header>
      <div className="container">
        <h1>{text}</h1>
      </div>
    </header>
  );
}

Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
