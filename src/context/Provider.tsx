import React, { useState } from "react";

import Context from "./context";
import * as Types from "./types";

interface IProps {
  children: React.ReactNode;
}

const Provider: React.FC<IProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<Types.User | undefined>(undefined);
  const [chatUserId, setChatUserId] = useState("");

  return (
    <Context.Provider
      value={{
        state: {
          chatUserId,
          isAuthenticated,
          profile,
        },
        methods: {
          setChatUserId,
          setIsAuthenticated,
          setProfile,
        },
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
