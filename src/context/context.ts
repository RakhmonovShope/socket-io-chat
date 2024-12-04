import { createContext } from "react";

import * as Types from "./types";

const context = createContext<Types.Value>({
  state: {
    chatUserId: "",
    profile: undefined,
    isAuthenticated: false,
  },
  methods: {
    setChatUserId: () => {},
    setProfile: () => {},
    setIsAuthenticated: () => {},
  },
});

export default context;
