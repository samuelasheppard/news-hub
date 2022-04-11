import { store } from "../redux/store";
import axios from "axios";

export class ApiController {
  fetchWeather = async (lat, long) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=17a3e02a9cc47ed1eac90bc2f9c0012a`;
      const resp = await axios.get(url);
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
      const url = `https://newsapi.org/v2/top-headlines?page=${page}&pageSize=10&country=gb&apiKey=f5061f7577794c6391637a546b361154`;
      const resp = await axios.get(url);
      store.dispatch({ type: "STORENEWS", payload: resp.data.articles });
      store.dispatch({ type: "FETCH", payload: false });
      if (resp.data.articles.length === 0) {
        const url = `https://newsapi.org/v2/everything?q=uk&page=${page}&pageSize=10&apiKey=f5061f7577794c6391637a546b361154`;
        const resp = await axios.get(url);
        store.dispatch({ type: "STORENEWS", payload: resp.data.articles });
        store.dispatch({ type: "FETCH", payload: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  userLogIn = async (credentials) => {
    try {
      const url = `http://localhost:6001/users/login/`;
      const resp = await axios.post(url, credentials);
      store.dispatch({ type: "STOREUSERDATA", payload: resp.data });
    } catch (error) {
      console.log(error);
    }
  };

  userLogOut = async (email, token) => {
    try {
      const url = `http://localhost:6001/users/logout/`;
      await axios.delete(url, { headers: { email, token } });
      store.dispatch({ type: "REMOVEUSERDATA" });
    } catch (error) {
      console.log(error);
    }
  };

  userGetFavourites = async (email, token) => {
    try {
      const url = `http://localhost:6001/users/favourites/all`;
      const resp = await axios.get(url, {
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
      const url = `http://localhost:6001/users/favourites/add`;
      await axios.post(
        url,
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
      const url = `http://localhost:6001/users/favourites/remove`;
      await axios.post(
        url,
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
      const url = `http://localhost:6001/users/details`;
      const resp = await axios.get(url, { headers: { email, token } });
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
      const url = `http://localhost:6001/users/modify/`;
      const resp = await axios.patch(
        url,
        { type, payload },
        { headers: { email, token } }
      );
      if (resp.data.status === 1) {
        store.dispatch({ type: "STOREUSERDATA", payload: resp.data });
      } else {
        return resp.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  userCreate = async (name, email, password) => {
    try {
      const url = `http://localhost:6001/users/addUser/`;
      const resp = await axios.post(url, { name, email, password });
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
