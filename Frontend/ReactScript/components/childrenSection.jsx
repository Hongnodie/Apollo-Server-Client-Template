import React from "react";

// Stateless Functional Component

const ChildrenSection = ({ User }) => {
  return (
      <div>
        <p>Tier2 Wrapper for children 1</p>
        <span>
          {User.selfid}
        </span>
      </div>
  );
};

export default ChildrenSection;
