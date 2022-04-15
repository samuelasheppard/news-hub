export const config = {
  keys: {
    weatherApi: `17a3e02a9cc47ed1eac90bc2f9c0012a`,
    newsApi: "f5061f7577794c6391637a546b361154",
  },

  urls: { newsHubServerApi: "https://api.news-hub.co.uk" },

  weatherApiUrl(lat, long) {
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${this.keys.weatherApi}`;
  },

  newsApiTopHeadlinesUrl(page) {
    return `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=10&country=gb&apiKey=${this.keys.newsApi}`;
  },

  newsApiEverythingUrl(page) {
    return `https://newsapi.org/v2/everything?q=uk&page=${page}&pageSize=10&apiKey=${this.keys.newsApi}`;
  },

  newsHubProxyUrl() {
    return `${this.urls.newsHubServerApi}/proxy`;
  },

  newsHubLogInUrl() {
    return `${this.urls.newsHubServerApi}/users/login`;
  },

  newsHubLogOutUrl() {
    return `${this.urls.newsHubServerApi}/users/logout`;
  },

  newsHubUserGetFavouritesUrl() {
    return `${this.urls.newsHubServerApi}/users/favourites/all`;
  },

  newsHubUserAddFavouriteUrl() {
    return `${this.urls.newsHubServerApi}/users/favourites/add`;
  },

  newsHubUserRemoveFavouriteUrl() {
    return `${this.urls.newsHubServerApi}/users/favourites/remove`;
  },

  newsHubGetUserDetailsUrl() {
    return `${this.urls.newsHubServerApi}/users/details`;
  },

  newsHubEditUserDetailsUrl() {
    return `${this.urls.newsHubServerApi}/users/modify`;
  },

  newsHubCreateUserUrl() {
    return `${this.urls.newsHubServerApi}/users/addUser`;
  },
};
