import React from "react";

// Stateless Functional Component

const OtherChildrenSection = ({ User }) => {
  return (
      <div>
        <p>Tier2 Wrapper for children 2</p>
        <span>
          {User.username}
        </span>
      </div>
  );
};

export default OtherChildrenSection;
