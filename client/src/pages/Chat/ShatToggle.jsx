import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
const SearchToggle = () => {
  return (
    <div className="search-toggle">
      <button className="back-button">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <input placeholder="Search" type="search" name="" id="" />
    </div>
  );
};

export default SearchToggle;
