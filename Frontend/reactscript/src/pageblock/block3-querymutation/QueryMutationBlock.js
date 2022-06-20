import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Example at https://www.apollographql.com/docs/react/data/mutations/
function QueryMutationBlock() {
  
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

  // Init the key bridging variable between input and cloud DB response, and also shoulders the display-value responsibility
  const [idNameCombo, setidNameCombo] = useState({});

  const getCurrentCloudData = async () => {
    const { data } = useQuery(GetUserSelfidQuery);
    let suerData = data.allUser;
    setidNameCombo({ ...suerData });
    console.log(idNameCombo);
  };
  
  // Put selfid to the idNameCombo.selfid variable
  const handleSelectChange = (event) => {
    // As parsed through <option>
    const { value } = event.target;
    setidNameCombo({ ...idNameCombo, [selfid]: value });
  };

  // 
  const handleFormSubmit = async (event) => {
      // Prevent the content from deminish after submitted
      event.preventDefault();

      setidNameCombo({ ...idNameCombo, [username]: input.value });
      const [changeUsername, { data }] = useMutation(ChangeUsernameMutation);
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
              <input type="text" placeholder='new username'></input>
              <button type="submit">
                  Change now!
              </button>
            </form>
            <div>
              <button onClick={getCurrentCloudData}>Check current cloud value</button>
              {idNameCombo.map((user) => {
                return (
                  <div key={selfid}> 
                    <span> {selfid} 's {username}  </span> 
                  </div>
                )
              })}
              </div>
            <div><a href='/'>Back to main</a></div>
        </div>
    )
}

export default QueryMutationBlock;