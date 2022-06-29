// 3-REDUX CPU BUILD UP
// Check full tutorial here https://www.reactjstutorials.com/
// Import for 3.3
import { configureStore } from '@reduxjs/toolkit'

// 3.1-Init some value
// Init(or "seed") the CPU (could also be done lastly, but we usually put it on top)
const initalValue = {
    users: [
      {
        selfid: "idforuser3",
        username: "user3",
        otherdetail: "is fantastic",
      },
      {
        selfid: "idforuser4",
        username: "user4",
        otherdetail: "is awful",
      }
    ]
}

// 3.2-Redux Processing Unit (RPU) definition (So-called "reducer")
// In official documentation, RPU is named as "reducer", parsedHeader is named as "action", parsedHeader.action is called "action.type" (unfortunately, we have to stick to the name "type" due to source code-it would require and check only xxx.type), parsedHeader.variables is called "action.payload" 
function UserRPU(state = initalValue, parsedHeader) {
    switch (parsedHeader.type) {
        case "addUser": {
            // Define what is the expected surgery on the state when a sepcific action is parsed from header
            let generatedNumber = Math.floor(Math.random() * 10000);
            // console.log(JSON.stringify(generatedNumber));
            // const userIdBase = "idforuser";
            let newUserId = "idforuser".concat(JSON.stringify(generatedNumber));
            // console.log(newUserId);
            const newUser = { ...parsedHeader.variables, selfid: newUserId };

            // Return all other state if exists and update the "users" state
            return {
                ...state,
                users: [...state.users, newUser],
            }
        }
        case "deleteUserByName": {
            // Here constrainst that variables should contain and only contain the username of the user to be deleted
            // console.log(parsedHeader);
            const userIndex = state.users.findIndex((user) => user.username === parsedHeader.variables.username);
            // console.log(userIndex);
            // console.log(parsedHeader.variables);
            
            // Delete the first found result
            const emptiedUserArrayByIndex = [...state.users];
            emptiedUserArrayByIndex.splice(userIndex,1);

            return {
                ...state,
                users: emptiedUserArrayByIndex,
            }
        }
        // A good practice to have default
        default: {
            return state;
        }
    }
}

// 3.3-Finalize the set-up of store
// Check out example at https://redux.js.org/introduction/why-rtk-is-redux-today
// import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    // Note that we have to name it "reducer" here
    reducer: {
      users: UserRPU,
    }
  })