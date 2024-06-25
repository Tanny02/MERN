import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    axios.get("/api/user/profile").then((response) => {
      setId(response.data.id);
      setUsername(response.data.username);
    });
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername, id, setId }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
