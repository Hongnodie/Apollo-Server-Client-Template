import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ChangeStateBlock() {
    // stateParser is called "dispatch" in official documentation, the function of it is to constantly doing the round trip from store to every single html component (listen to them)
    const stateParser = useDispatch();

    // Check out the reason to use here https://www.reactjstutorials.com/react-redux/14/redux-use-selector
    const state = useSelector((state) => state);

    const [newUsername, setnewUsername] = useState('');

    return (
        <>
        <h2>Do surgery on state (Redux)</h2>
        <div>
            Add a user:
            <input
              defaultValue={newUsername}
              onChange={(event) => setnewUsername(event.target.value)}
              placeholder="new username"
              type="text"
            />
            <button
              onClick={() => stateParser({ 
                type: "addUser", 
                variables: { username: newUsername }, 
                })}
            >
              Add This User
            </button>
        </div>
        <div>
            {/* {console.log(state.users.users[0].selfid)} */}
            <h3>Current id - username list</h3>
            {state.users.users.map((user) => { return (
                <div key={user.selfid}>
                    id ({user.selfid}) - username ({user.username})
                </div>
                )
            })}
        </div>
        <div><a href='/'>Back to main</a></div>
        </>

    )
}