import { store } from "../store";

export class ScrollController {
  detectScroll = (e) => {
    if (e.target.scrollTop < e.target.clientHeight) {
      return false;
    } else {
      return true;
    }
  };

  detectEnd = (e, fetching) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;
    if (Math.ceil(scrollTop + offsetHeight) >= scrollHeight - 20) {
      if (!fetching) {
        store.dispatch({ type: "FETCH", payload: true });
        store.dispatch({ type: "INCREMENTPAGE" });
      }
    }
  };

  scrollToTop = (top) => {
    top.current.scrollTo(0, 0);
  };
}
