import React from 'react';

const FormGroup = (props) => {
  let formControl = "form-control";

  if(props.touched && !props.valid) {
    formControl = 'form-control is-invalid';
  }

  return (
    <div className="form-group">
      <label className="label">{ props.label }</label>
      <input type="text" className={formControl} {...props}></input>
      <div className="invalid-feedback"></div>
    </div>
  );
}

export default FormGroup;
