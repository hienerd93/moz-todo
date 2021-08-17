import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import About from "./About";
import TodoPages from "./TodoPage";
import Users from "./User";
import Login from "./Login";

const fakeAuth = {
  isAuthenticated: false,
  signIn(cb: any) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb: any) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};

interface ContextProps {
  user: string | null;
  signIn: (cb: any) => void;
  signOut: (cb: any) => void;
}

const authContext = createContext({} as ContextProps);

function ProvideAuth({ children }: { children: any }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState<string | null>(null);

  const signIn = (cb: any) => {
    return fakeAuth.signIn(() => {
      setUser("user");
      cb();
    });
  };

  const signOut = (cb: any) => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signIn,
    signOut,
  };
}

function AuthButton() {
  let history = useHistory();
  let auth = useAuth();

  return (auth as any).user ? (
    <p>
      Welcome!{" "}
      <button
        className="btn btn__primary"
        onClick={() => {
          (auth as any).signOut(() => history.push("/login"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

function PrivateRoute({
  children,
  ...rest
}: {
  children: any;
  exact?: boolean;
  path: string;
}) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (auth as any).user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <nav>
            <AuthButton />
            <ul>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/users">Users</Link>
              </li>
              <li>
                <Link to="/">Todo</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <PrivateRoute path="/about">
              <About />
            </PrivateRoute>
            <PrivateRoute path="/users">
              <Users />
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute exact path="/">
              <TodoPages />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}
