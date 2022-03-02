import { createStore } from "redux";

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
