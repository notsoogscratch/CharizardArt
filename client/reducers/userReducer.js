import * as types from '../constants/actionTypes';
import io from 'socket.io-client';


const initialState = {
  username: null,
  password: null,
  verified: null,
  error: null,
  needsToSignup: false,
  userCreated: false,
  artRecieved: false,
  chartArr: [],
  goToStats: false,
  art: [],
  googleSignedIn: false,
  goToChat: false,
  currMsg: "",
  msgsArr: ['Welcome!'],
  // socket: io('http://192.168.0.108:3000'),
  socket: io()
};

const userReducer = (state = initialState, action) => {
  //declared variables to make sure we update state with new state.
  let newVerified;
  let newError;
  let newUsername;
  let newPassword;
  let newNeedsToSignup;
  let newUserCreated;
  let newArtRecieved;
  let newArt;
  let newGoogleSignedIn;
  let newGoToChat;
  let newCurrMsg;

  switch (action.type) {
    case types.GOOGLE_LOGIN:
      newGoogleSignedIn = true;

      return {
        ...state,
        googleSignedIn: newGoogleSignedIn
      }

    //If you watch STATE in Redux devTools, you will see it update everytime a user types a letter
    case types.LOGIN_USERNAME:
      newUsername = action.payload.value;
      return {
        ...state,
        username: newUsername,
      };
    //If you watch STATE in Redux devTools, you will see it update everytime a user types a letter
    case types.LOGIN_PASSWORD:
      newPassword = action.payload.value;
      return {
        ...state,
        password: newPassword,
      };

    case types.POST_USERNAME_AND_PASSWORD_SUCCESS:
      newVerified = true;
      return {
        ...state,
        verified: newVerified,
        // May need to reset certain areas of state (error, etc.)
        // error: null
      };

    case types.POST_USERNAME_AND_PASSWORD_FAILURE:
      newVerified = false;
      //coordinate with backend re err sent back from server//
      newError = action.payload.payload.response.data.error;
      return {
        ...state,
        verified: newVerified,
        error: newError,
      };

    case types.SIGNUP:
      newNeedsToSignup = action.payload;
      return {
        ...state,
        needsToSignup: newNeedsToSignup,
      };

    case types.POST_CREATE_USER_SUCCESS:
      newUserCreated = true;
      return {
        ...state,
        userCreated: newUserCreated,
      };

    case types.POST_CREATE_USER_FAILURE:
      return {
        ...state,
      };

    case types.POST_GET_ART_SUCCESS:
      newArtRecieved = true;
      newArt = action.payload.payload;
 
      newArt = action.payload.payload

      return {
        ...state,
        artRecieved: newArtRecieved,
        art: newArt,
      };

    case types.POST_GET_ART_FAILURE:
      return {
        ...state,
      };

    case types.GET_STATS:
    let dataIWant = action.payload.Results.series;
    const xValues = ['Hourly', 'Yearly'];
    const yValues = dataIWant.map(el => {
      // console.log(el.data, 'el.data')
      return el.data[0].value
    })
    // console.log(yValues, 'newArr')

    const newArr = [];

    xValues.forEach((x, i) => newArr.push({
      [x]: yValues[i]
    }))

    console.log(newArr, 'newArr')

        return {
          ...state,
          chartArr: newArr,

        };
    case types.STATS:
      let newGoToStats = action.payload;
      return {
        ...state,
        goToStats: newGoToStats,
      }
      let newChartArr = [];
      //this is where you'll map over the data and save only the things you want to state;
      newchartArr.push(action.payload.data, ...state)
      return {
        ...state,
        chartArr: newChartArr,

      };

    case types.CHAT:
      newGoToChat = action.payload;
      return {
        ...state,
        goToChat: newGoToChat,
      };

    case types.CURR_MSG:
      console.log('in curr msg ', action.payload.value)
      newCurrMsg = action.payload.value;
      return {
        ...state,
        currMsg: newCurrMsg
      }

    case types.MSG_ARR:
      if (state.currMsg.length > 0) {
        let newMsg = action.payload;
        let newMsgArr = state.msgsArr.slice(0);
        newMsgArr.push(newMsg);
        let restartMsg = '';
        return {
          ...state,
          currMsg: restartMsg,
          msgsArr: newMsgArr,
        }
      }
      return {
        ...state
      }

    default:
      return state;
  }
}

export default userReducer;