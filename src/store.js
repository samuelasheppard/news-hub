import { createStore } from "redux";

const initialState = {
  currentLocation: { long: "", lat: "", error: false },
  news: undefined,
  myFavourites: undefined,
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
      }
      return { ...state, currentLocation: { error: true } };

    case "STOREWEATHER":
      return { ...state, weather: action.payload };
    case "STORENEWS":
      const articles = state.news ? [...state.news] : [];
      return { ...state, news: [...articles, ...action.payload] };
    case "ADDTOFAVOURITES":
      const newList = state.myFavourites ? [...state.myFavourites] : [];
      if (newList.includes(action.payload)) {
        const index = newList.indexOf(action.payload);
        newList.splice(index, 1);
        return { ...state, myFavourites: newList };
      }
      newList.push(action.payload);
      return { ...state, myFavourites: newList };

      // case "FILTER":
      //   console.log(state.myFavourites);
      //   if (state.myFavourites) {
      //     const favourites = [...state.myFavourites];
      //     const news = [...state.news];
      //     const filteredNews = [];
      //     news.forEach((item) => {
      //       if (favourites.includes(item.source.name)) {
      //         filteredNews.push(item);
      //       }
      //     });
      //     return { ...state, filteredNews };
      //   }
      return state;
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
