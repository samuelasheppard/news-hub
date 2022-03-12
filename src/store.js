import { createStore } from "redux";

const initialState = {
  currentLocation: { long: "", lat: "", error: false },
  news: [],
  myFavourites: [],
  myFeed: [],
  page: 1,
  fetching: false,
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
      } else {
        return { ...state, currentLocation: { error: true } };
      }
    case "STOREWEATHER":
      return { ...state, weather: action.payload };
    case "STORENEWS":
      const articles = [...state.news];
      const newArticles = [...action.payload];
      const test = articles.concat(newArticles);
      return { ...state, news: test };
    case "ADDTOFEED":
      const newList = [...state.myFavourites];
      if (newList.includes(action.payload)) {
        const index = newList.indexOf(action.payload);
        newList.splice(index, 1);
        return { ...state, myFavourites: newList };
      } else {
        newList.push(action.payload);
        return { ...state, myFavourites: newList };
      }
    case "CREATEMYFEED":
      const favourites = [...state.myFavourites];
      const news = [...state.news];
      const myFeed = [];
      news.forEach((item) => {
        if (favourites.includes(item.source.name)) {
          myFeed.push(item);
        }
      });
      return { ...state, myFeed };
    case "INCREMENTPAGE":
      console.log(state.page + 1);
      return { ...state, page: state.page + 1 };
    case "FETCH":
      return { ...state, fetching: action.payload };
    default:
      return state;
  }
}

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
