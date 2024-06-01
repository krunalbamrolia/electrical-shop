import React from 'react'

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  )
}

export default Button