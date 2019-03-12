import React from 'react';

const TextArea = props => {

  let formControl = "form-control";

  if (props.touched && !props.valid) {
    formControl = 'form-control control-error';
  }

  return (
    <div className="form-group">
      <label className="label">{ props.label }</label>
      <textarea {...props} className={formControl}>
      </textarea>
      <div className="invalid-feedback"></div>
    </div>
  );
}

export default TextArea;
