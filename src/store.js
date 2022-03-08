import { createStore } from "redux";

const initialState = { currentLocation: { long: "", lat: "", error: false } };

function reducer(state = initialState, action) {
  switch (action.type) {
    case "STORELOCATION":
      if (action.payload.coords) {
        return {
          ...state,
          currentLocation: {
            long: action.payload.coords.longitude,
            lat: action.payload.coords.latitude,
            error: false,
          },
        };
      } else {
        return { ...state, currentLocation: { error: true } };
      }
    case "STOREWEATHER":
      return { ...state, weather: action.payload };
    case "STORENEWS":
      return { ...state, news: action.payload };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
