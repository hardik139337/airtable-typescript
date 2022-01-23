import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "./action";

import Com from "./com";
import { RootState, toggleSlice, useAppSelector } from "./redux";
function App() {
  const login = useAppSelector((state) => state.login.value);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  function handelsubmit() {
    dispatch(toggleSlice.actions.toggle());
    dispatch(getData(name));
  }

  return (
    <div className="app">
      {login ? (
        <div>
          <input
            type="text"
            placeholder="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button onClick={handelsubmit}>login</button>
        </div>
      ) : (
        <div>
          <Com></Com>
        </div>
      )}
    </div>
  );
}

export default App;
