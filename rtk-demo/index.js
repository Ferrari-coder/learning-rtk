const store = require("./app/store");
// const cakeActions = require("./features/cake/cakeSlice").cakeActions;
const cakeReducer = require("./features/cake/cakeSlice").cakeReducer;

console.log("Initial state:", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("State updated:", store.getState())
);


console.log(cakeReducer)
store.dispatch(cakeReducer.ordered())
store.dispatch(cakeReducer.ordered())
store.dispatch(cakeReducer.ordered())
store.dispatch(cakeReducer.restocked(5))
unsubscribe();
