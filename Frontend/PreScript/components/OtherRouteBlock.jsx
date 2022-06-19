import { useQuery, gql } from '@apollo/client';
const UserInfoQuery = gql`
    query allUser {
        selfid
        username
    }`

// Stateless Functional Component

const OtherRouteBlock = ({ User }) => {
  return (
      <div>
        <p>Tier3 (OtherChildrenSection) Wrapper for children 2</p>
        <span>
          {User.username}
        </span>
      </div>
  );
};

export default OtherRouteBlock;
