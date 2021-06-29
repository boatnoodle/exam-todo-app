import React from "react";
import GlobalStyle from "global-styles";

import { Switch, Route } from "react-router-dom";
import { LayoutMain } from "components/Layout";
import { HomePage } from "pages/home";
import { SignIn } from "containers/singin";
import { LayoutAuth } from "components/Layout/auth";
import { ProvideAuth, ProtectedFragment } from "hooks/auth/useSession";
import { TodoList } from "containers/todo/list";
import { CreateTask } from "containers/todo/create";
import { UpdateTask } from "containers/todo/update";
import { TaskDetail } from "containers/todo/show";

const PublicRoute = ({
  component: Component,
  useLayout,
  protectedRoute,
  ...rest
}) => {
  const layout = (props) => {
    if (useLayout === "auth") {
      if (protectedRoute)
        return (
          <ProtectedFragment>
            <LayoutAuth>
              <Component {...props} />
            </LayoutAuth>
          </ProtectedFragment>
        );
      else
        return (
          <LayoutAuth>
            <Component {...props} />
          </LayoutAuth>
        );
    } else if (useLayout === "main")
      if (protectedRoute)
        return (
          <ProtectedFragment>
            <LayoutMain>
              <Component {...props} />
            </LayoutMain>
          </ProtectedFragment>
        );
      else
        return (
          <LayoutMain>
            <Component {...props} />
          </LayoutMain>
        );
  };

  return <Route {...rest} render={(props) => layout(props)} />;
};

function App() {
  return (
    <ProvideAuth>
      <Switch>
        <PublicRoute
          exact
          path="/"
          component={HomePage}
          useLayout="main"
          protectedRoute={true}
        />
        <PublicRoute
          exact
          path="/sign-in"
          component={SignIn}
          useLayout="auth"
          protectedRoute={false}
        />
        <PublicRoute
          exact
          path="/todo-list"
          component={TodoList}
          useLayout="main"
          protectedRoute={false}
        />
        <PublicRoute
          exact
          path="/task/:id"
          component={TaskDetail}
          useLayout="main"
          protectedRoute={false}
        />
        <PublicRoute
          exact
          path="/create-task"
          component={CreateTask}
          useLayout="main"
          protectedRoute={false}
        />
        <PublicRoute
          exact
          path="/update-task/:id"
          component={UpdateTask}
          useLayout="main"
          protectedRoute={false}
        />
      </Switch>
      <GlobalStyle />
    </ProvideAuth>
  );
}

export default App;
