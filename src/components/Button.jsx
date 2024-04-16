import React from 'react';
import './Button.css';

export function Button(props) {
  /*  let classes = 'button ';
  classes = classes + (props.operation ? 'operation' : '');
  classes += props.double ? 'double' : '';
  classes += props.triple ? 'triple' : '';

  // Se você usar dessa forma e declarar a variável no atributo className
  // exemplo: className={classes} */

  return (
    <button
      onClick={() => props.click && props.click(props.label)}
      className={`button ${props.operation ? 'operation' : ''} ${props.double ? 'double' : ''} ${props.triple ? 'triple' : ''}`}
    >
      {props.label}
    </button>
  );
}
