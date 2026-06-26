import { lazy } from "react";
import { Route, Routes } from "react-router";
import { RootLayout } from "../layouts/RootLayout";

const GamePage = lazy(() => import("../pages/GamePage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={RootLayout}>
        <Route path="/" Component={GamePage} />
      </Route>
    </Routes>
  );
};
