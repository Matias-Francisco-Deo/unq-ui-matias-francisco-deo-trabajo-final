import { lazy } from "react";
import { Route, Routes } from "react-router";
import { RootLayout } from "../layouts/RootLayout";

const GamePage = lazy(() => import("../pages/GamePage"));
const LeaderboardPage = lazy(() => import("../pages/LeaderboardPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={RootLayout}>
        <Route path="/" Component={GamePage} />
        <Route path="/game" Component={GamePage} />
        <Route path="/leaderboard" Component={LeaderboardPage} />
      </Route>
    </Routes>
  );
};
