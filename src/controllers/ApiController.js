import { store } from "../redux/store";
import axios from "axios";
import { config } from "../config";

export class ApiController {
  fetchWeather = async (lat, long) => {
    try {
      const resp = await axios.get(config.weatherApiUrl(lat, long));
      store.dispatch({ type: "STOREWEATHER", payload: resp.data.daily });
    } catch (error) {
      console.log(error);
    }
  };

  storeLocation = (data) => {
    store.dispatch({ type: "STORELOCATION", payload: data });
  };

  fetchNews = async (page) => {
    try {
      const resp = await axios.get(config.newsApiTopHeadlinesUrl(page));
      store.dispatch({ type: "STORENEWS", payload: resp.data.articles });
      store.dispatch({ type: "FETCH", payload: false });
      if (resp.data.articles.length === 0) {
        const resp = await axios.get(config.newsApiEverythingUrl(page));
        store.dispatch({ type: "STORENEWS", payload: resp.data.articles });
        store.dispatch({ type: "FETCH", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  userLogIn = async (credentials) => {
    try {
      const resp = await axios.post(config.newsHubLogInUrl(), credentials);
      store.dispatch({ type: "STOREUSERDATA", payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };

  userLogOut = async (email, token) => {
    try {
      await axios.delete(config.newsHubLogOutUrl(), {
        headers: { email, token },
      });
      store.dispatch({ type: "REMOVEUSERDATA" });
    } catch (error) {
      console.log(error);
    }
  };

  userGetFavourites = async (email, token) => {
    try {
      const resp = await axios.get(config.newsHubUserGetFavouritesUrl(), {
        headers: {
          email,
          token,
        },
      });
      store.dispatch({ type: "STOREUSERFAVOURITES", payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };

  userAddFavourite = async (email, token, source) => {
    try {
      await axios.post(
        config.newsHubUserAddFavouriteUrl(),
        { source: source },
        {
          headers: {
            email,
            token,
          },
        }
      );
      await this.userGetFavourites(email, token);
    } catch (error) {
      console.log(error);
    }
  };

  userRemoveFavourite = async (email, token, source) => {
    try {
      await axios.post(
        config.newsHubUserRemoveFavouriteUrl(),
        { source: source },
        {
          headers: {
            email,
            token,
          },
        }
      );
      await this.userGetFavourites(email, token);
    } catch (error) {
      console.log(error);
    }
  };

  getUserDetails = async (email, token) => {
    try {
      const resp = await axios.get(config.newsHubGetUserDetailsUrl(), {
        headers: { email, token },
      });
      const combinedData = {
        email: resp.data.user.email,
        name: resp.data.user.name,
        status: resp.data.status,
        token,
      };
    } catch (error) {
      console.log(error);
    }
  };

  userEditDetails = async (email, token, type, payload) => {
    try {
      const resp = await axios.patch(
        config.newsHubEditUserDetailsUrl(),
        { type, payload },
        { headers: { email, token } }
      );
      if (resp.data.status === 1) {
        store.dispatch({ type: "STOREUSERDATA", payload: resp.data });
        return resp.data;
      } else {
        return resp.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  userCreate = async (name, email, password) => {
    try {
      const resp = await axios.post(config.newsHubCreateUserUrl(), {
        name,
        email,
        password,
      });
      if (resp.data.status === 0) {
        return resp.data.message;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
}
