const redux = require("redux");
const createStore = redux.createStore; //-- Holds application state
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

console.log("First reduxxxxx lets get itttttttt");

const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED"; // step 1

//for icecream
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

function orderCake() {
  //action creator
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  // step 2
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}

function restockIceCream(qty = 1) {
  // step 2
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};
// (previousState, action) => newState

//reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       };
//     case CAKE_RESTOCKED: // step 3
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1,
//       };
//     case ICECREAM_RESTOCKED:
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams + action.payload,
//       };
//     default:
//       return state;
//   }
// };

//cleaner way of writing codes    reducers
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    case CAKE_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger)); //create redux store
console.log("Initial state", store.getState()); //-- Allows access to state via getState()

//Handling unregistering of listeners via the funtion returned by subscribe(listener)
const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake()); //-- Allows state to be updated via dispatch(action)
// store.dispatch(orderCaRke());
// store.dispatch(orderCake());
// store.dispatch(restockCake(5)) // step 4

const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(8); //anotrher version of step 4
actions.orderIceCream();
actions.orderIceCream();
actions.orderIceCream();
actions.restockIceCream(5);

unsubscribe(); //Handling unregistering of listeners via the funtion returned by subscribe(listener)
