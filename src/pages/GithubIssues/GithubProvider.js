import React, { useReducer, useEffect, useState } from "react";
import { fetchData } from "./api";
import { initialReducer } from "./reducer/GithubActions";

export const Context = React.createContext();

const GithubProvider = (props) => {
  const [state, dispatch] = useReducer(initialReducer, []);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(dispatch).then(() => setLoading(false));
  }, []);

  return (
    <Context.Provider value={{ state, isLoading, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

export default GithubProvider;
