import { useSelector, useDispatch } from "react-redux";

function App() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => {
        dispatch({ type: "increment" });
      }}
    >
      {count}
    </div>
  );
}

export default App;
