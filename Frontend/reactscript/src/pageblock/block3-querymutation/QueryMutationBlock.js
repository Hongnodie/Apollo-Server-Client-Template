import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Define gql statement (copy and paste from apollo)
const GetUserSelfidQuery = gql`
query Query {
  allUser {
    selfid
    username
  }
}
`
const ChangeUsernameMutation = gql`
mutation Mutation($selfid: String!, $newUsername: String!) {
  changeUsernameBySelfid(selfid: $selfid, newUsername: $newUsername) {
    selfid
    username
  }
}
`

// Example at https://www.apollographql.com/docs/react/data/mutations/
function QueryMutationBlock() {
  
  // Since both useQuery and useMutation can reutrn "data", and we can't define two data at the same time, Refetch or Polling or Subscription should work
  // See explaination at https://www.apollographql.com/docs/react/data/queries/#updating-cached-query-results
  
  // Init the key bridging variable between input and cloud DB response, and also shoulders the display-value responsibility
  const [idNameCombo, setidNameCombo] = useState({});

  const { data } = useQuery(GetUserSelfidQuery);

  const getCurrentCloudData = () => {
    let suerData = data.allUser;
    setidNameCombo({ ...suerData });
    console.log(idNameCombo);
  };
  
  // Put selfid to the idNameCombo.selfid variable
  const handleSelectChange = (event) => {
    // As parsed through <option>
    const { value } = event.target;
    setidNameCombo({ ...idNameCombo, selfid: value });
  };

  const [changeUsername, {}] = useMutation(ChangeUsernameMutation);

  const handleFormSubmit = async (event) => {
      // Prevent the content from deminish after submitted
      event.preventDefault();

      setidNameCombo({ ...idNameCombo, username: this.input.value });
      try {
          const { data } = await changeUsername({ variables: { 
            ...idNameCombo
          }, });
          setidNameCombo({
            selfid: data.selfid,
            username: data.selfid
          })
        } catch (err) {
          console.error(err);
        }
  }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
              <label>Select user by current username: </label>
              <select name="username" onChange={handleSelectChange}>
                  {idNameCombo.map((user) => {
                      return (
                      <option key={user.selfid} value={user.selfid}>
                          {user.username}
                      </option>
                      );
                  })}
              </select>
              <input type="text" placeholder='new username' />
              <button type="submit">
                  Change now!
              </button>
            </form>
            <div>
              <button onClick={getCurrentCloudData}>Check current cloud value</button>
              {idNameCombo.map((user) => {
                return (
                  <div key={user.selfid}> 
                    <span> {user.selfid} 's {user.username}  </span> 
                  </div>
                )
              })}
            </div>
            <div><a href='/'>Back to main</a></div>
        </div>
    )
}

export default QueryMutationBlock;