// 3-REDUX CPU BUILD UP
// Check full tutorial here https://www.reactjstutorials.com/
// Import for 3.3
import { configureStore } from '@reduxjs/toolkit'

// 3.1-Redux Processing Unit (RPU) definition (So-called "reducer") build up
// 3.1.1-Init(or "seed") the CPU (could also be done lastly, but we usually put it on top)
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

// In official documentation, RPU is named as "reducer", parsedHeader is named as "action", parsedHeader.action is called "action.type", parsedHeader.variables is called "action.payload" (unfortunately, we have to stick to the name "type")
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

            return {
                ...state,
                users: [...state.users, newUser],
            }
        }
        case "deleteUserByName": {
            // Here constrainst that variables should contain and only contain the username of the user to be deleted
            const userIndex = state.users.findIndex((user) => user.username === parsedHeader.variables);
            
            // Delete the first found result
            const emptiedUserArrayByIndex = [...state.users];
            emptiedUserArrayByIndex[userIndex] = {};

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

// 3.3
// Check out example at https://redux.js.org/introduction/why-rtk-is-redux-today
// import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
    // Note that we have to name it "reducer" here
    reducer: {
      users: UserRPU,
    }
  })