import React from "react";

const Searchpost = ({children, displayHeader}) => {
  return (
    <div>
      {displayHeader === "feature" && children}
    </div>
  );
};

export default Searchpost;
