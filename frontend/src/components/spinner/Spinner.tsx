import React from 'react';
import './Spinner.css';

interface SpinnerProps {
  size?: number;
  color?: string;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 10, color = '#333' }) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 5}px solid ${color}`,
    borderTop: `${size / 5}px solid transparent`,
  };

  return <div className="spinner" style={spinnerStyle}></div>;
};

export default Spinner;
