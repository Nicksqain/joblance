import React from "react";
import "./input.scss";
const Input = ({ type, value, label, help, setValue }) => {
  return (
    <div className="">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type={type}
        className="form-control"
      />
      {/* <div className={type + "Help form-text"}>{help}</div> */}
    </div>
  );
};

export default Input;
