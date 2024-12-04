export interface State {
  isAuthenticated: boolean;
  profile?: User;
  chatUserId: string;
}

export interface User {
  active: boolean;
  birthday: string;
  createdAt: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  name: string;
  password: string;
  phone: string;
  roleId: string;
  subType: string;
  updatedAt: string;
}

export interface Methods {
  setChatUserId: (value: string) => void;
  setIsAuthenticated: (value: boolean) => void;
  setProfile: (value: User) => void;
}

export interface Value {
  state: State;
  methods: Methods;
}
