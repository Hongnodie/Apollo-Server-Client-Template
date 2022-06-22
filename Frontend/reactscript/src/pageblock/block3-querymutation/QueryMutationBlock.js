import { useQuery, useMutation, gql } from '@apollo/client';
import { useState } from 'react';

// Example at https://www.apollographql.com/docs/react/data/mutations/
function QueryMutationBlock() {
  
  // Since both useQuery and useMutation can reutrn "data", and we can't define two data at the same time, Refetch or Polling or Subscription should work
  // See explaination at https://www.apollographql.com/docs/react/data/queries/#updating-cached-query-results
  
  // Init the key bridging variable between input and cloud DB response, and also shoulders the display-value responsibility
  // Define gql statement (copy and paste from apollo)
  const GetUserSelfidQuery = gql`
  query Query {
    allUser {
      _id
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

  const { data } = useQuery(GetUserSelfidQuery);
  // console.log(data);

  // const [idNameCombo, setidNameCombo] = useState({data});

  // const getCurrentCloudData = () => {
  //   let suerData = data.allUser;
  //   setidNameCombo({ ...suerData });
  //   console.log(idNameCombo);
  // };
  
  // Put selfid to the idNameCombo.selfid variable
  // const handleSelectChange = (event) => {
  //   // As parsed through <option>
  //   const { value } = event.target;
  //   setidNameCombo({ ...idNameCombo, selfid: value });
  // };

  // const [changeUsername, {}] = useMutation(ChangeUsernameMutation);

  // const handleFormSubmit = async (event) => {
  //     // Prevent the content from deminish after submitted
  //     event.preventDefault();

  //     setidNameCombo({ ...idNameCombo, username: this.input.value });
  //     try {
  //         const { data } = await changeUsername({ variables: { 
  //           ...idNameCombo
  //         }, });
  //         setidNameCombo({
  //           selfid: data.selfid,
  //           username: data.selfid
  //         })
  //       } catch (err) {
  //         console.error(err);
  //       }
  // }
  // onSubmit={handleFormSubmit}
  // onChange={handleSelectChange}
    return (
        <div>
          <form>
          <label>Select user by current username: </label>
          <select>
            {data.allUser.map(({ selfid, username }) => {
                      return (
                          <option key={selfid} value={selfid}> 
                            <span> {selfid} 's {username}  </span> 
                          </option>
                      )})
                    }
          </select>
          <input type="text" placeholder='new username' />
          <div><button type="submit"> Change now! </button></div>
          </form>

            {/* <form>
              <label>Select user by current username: </label>
              <select name="username">
                  {data.allUser.map(({ selfid, username }) => {
                      return (
                      <option key={selfid} value={selfid}>
                          {username}
                      </option>
                      );
                  })}
              </select>
              <input type="text" placeholder='new username' />
              <button type="submit"> Change now! </button>
            </form> */}
            {/* <div>
              <button onClick={getCurrentCloudData}>Check current cloud value</button>
              {idNameCombo.map((user) => {
                return (
                  <div key={user.selfid}> 
                    <span> {user.selfid} (id) 's {user.username} (username) </span> 
                  </div>
                )
              })}
            </div> */}
            <div><a href='/'>Back to main</a></div>
        </div>
    )
}

export default QueryMutationBlock;