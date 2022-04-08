export function getInitialState() {
  const storedSession = JSON.parse(window.localStorage.getItem("session"));

  return {
    currentLocation: { long: "", lat: "", error: false },
    news: undefined,
    myFavourites: undefined,
    page: 1,
    fetching: false,
    user: storedSession || { loggedIn: false },
  };
}
