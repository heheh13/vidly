import React from "react";

const Select = ({ name, label, options, onChange, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        onChange={onChange}
        {...rest}
        className="form-control"
      >
        <option value="" />
        {options.map((op) => (
          <option key={op._id} value={op._id}>
            {op.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
