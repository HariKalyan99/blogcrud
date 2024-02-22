import React from "react";

const Searchpost = ({children, displayHeader}) => {
  return (
    <div>
      {displayHeader && children}
    </div>
  );
};

export default Searchpost;
