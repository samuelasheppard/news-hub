import { store } from "./store";
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

  fetchNews = async () => {
    try {
      const url =
        "https://newsapi.org/v2/top-headlines?country=gb&apiKey=f5061f7577794c6391637a546b361154";
      const resp = await axios.get(url);
      store.dispatch({ type: "STORENEWS", payload: resp.data.articles });
    } catch (error) {
      console.log(error);
    }
  };
}
