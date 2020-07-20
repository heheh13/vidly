import React from "react";
const Input = ({ name, label, value, onchange, type, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        value={value}
        onChange={onchange}
        name={name}
        id={name}
        type={type}
        className="form-control"
      ></input>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
