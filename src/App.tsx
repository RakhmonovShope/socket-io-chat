import ChatPage from "./components/Chat/ChatPage";

import Auth from "./Auth";
import http from "./http";

import { useEffect } from "react";
import { useContext } from "./context";

const App = () => {
  const { state, methods } = useContext();

  useEffect(() => {
    http.get("/auth/get-me").then((response) => {
      console.log("response", response.data);

      methods.setIsAuthenticated(true);
      methods.setProfile(response.data);
    });
  }, []);

  return state.isAuthenticated ? <ChatPage /> : <Auth />;
};

export default App;
