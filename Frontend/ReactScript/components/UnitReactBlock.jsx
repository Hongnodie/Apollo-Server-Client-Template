import { useQuery, gql } from '@apollo/client';
const UserInfoQuery = gql`
    query allUser {
        selfid
        username
    }`

// Stateless Functional Component

function UnitReactBlock() {
  const { loading, error, data } = useQuery(UserInfoQuery);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  return data.allUser.map(({ selfid, username }) => (
      <div>
          <p>Tier3 (UnitReactBlock) Wrapper for children</p>
          <span>
              UnitReactBlock gives selfid: {selfid}
          </span>
      </div>
  ));
}

export default UnitReactBlock;
