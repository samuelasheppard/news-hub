import { createStore } from "redux";

const storedSession = JSON.parse(window.localStorage.getItem("session"));
const initialState = storedSession
  ? {
      currentLocation: { long: "", lat: "", error: false },
      news: undefined,
      myFavourites: undefined,
      page: 1,
      fetching: false,
      user: storedSession,
    }
  : {
      currentLocation: { long: "", lat: "", error: false },
      news: undefined,
      myFavourites: undefined,
      page: 1,
      fetching: false,
      user: { loggedIn: false },
    };

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
      }
      return { ...state, currentLocation: { error: true } };

    case "STOREWEATHER":
      return { ...state, weather: action.payload };
    case "STORENEWS":
      const articles = state.news ? [...state.news] : [];
      return { ...state, news: [...articles, ...action.payload] };
    case "INCREMENTPAGE":
      console.log(state.page + 1);
      return { ...state, page: state.page + 1 };
    case "FETCH":
      return { ...state, fetching: action.payload };
    case "STOREUSERDATA":
      const { status } = action.payload;
      if (status === 0) {
        return { ...state, user: { ...state.user, logInError: true } };
      } else {
        const { token, email, name } = action.payload.user;
        const session = JSON.stringify({
          loggedIn: true,
          token,
          email,
          name,
        });
        window.localStorage.setItem("session", session);
        return {
          ...state,
          user: {
            ...state.user,
            loggedIn: true,
            logInError: false,
            token,
            email,
            name,
          },
        };
      }

    case "STOREUSERFAVOURITES":
      const { favourites } = action.payload;
      return { ...state, myFavourites: favourites };
    case "REMOVEUSERDATA":
      window.localStorage.removeItem("session");
      return { ...state, myFavourites: undefined, user: { loggedIn: false } };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
