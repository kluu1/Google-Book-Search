import React from 'react';

function SaveBtn(props) {
  return (
    <button className="btn btn-primary save-btn" {...props} tabIndex="0">
      Save this book
    </button>
  );
}

export default SaveBtn;
