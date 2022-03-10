import { createStore } from "redux";

const initialState = {
  currentLocation: { long: "", lat: "", error: false },
  myFeed: [],
};

const localStorage = window.localStorage;

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
      console.log(action.payload);
      return { ...state, news: action.payload };
    case "ADDTOFEED":
      const newList = [...state.myFeed];
      if (newList.includes(action.payload)) {
        const index = newList.indexOf(action.payload);
        newList.splice(index, 1);
        console.log(newList);
        return { ...state, myFeed: newList };
      } else {
        newList.push(action.payload);
        console.log(newList);
        return { ...state, myFeed: newList };
      }

    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
