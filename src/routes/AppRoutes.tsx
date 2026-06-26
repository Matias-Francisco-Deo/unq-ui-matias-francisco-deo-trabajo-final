import { lazy } from "react";
import { Route } from "react-router";
import { Routes } from "react-router";

import { AppLayout } from "@/layouts/AppLayout";
import { ProtectedLayout } from "@/layouts/ProtectedLayout";
import { PublicLayout } from "@/layouts/PublicLayout";
import { RootLayout } from "@/layouts/RootLayout";

// PUBLIC PAGES
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/RegisterPage"));

// PROTECTED PAGES
const EditPostPage = lazy(() => import("@/pages/EditPostPage"));
const NewPostPage = lazy(() => import("@/pages/NewPostPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));
const PostPage = lazy(() => import("@/pages/PostPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const TimelinePage = lazy(() => import("@/pages/TimelinePage"));
const UserPage = lazy(() => import("@/pages/UserPage"));

export const AppRoutes = () => {
  return (
    <Routes>
      <Route Component={RootLayout}>
        <Route Component={PublicLayout}>
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Route>

        <Route Component={ProtectedLayout}>
          <Route Component={AppLayout}>
            <Route index Component={TimelinePage} />
            <Route path="/search" Component={SearchPage} />
            <Route path="/new-post" Component={NewPostPage} />
            <Route path="/edit-post/:postId" Component={EditPostPage} />
            <Route path="/p/:postId" Component={PostPage} />

            <Route path="/:userId" Component={UserPage} />

            {/* Not Found Route */}
            <Route path="*" Component={NotFoundPage} errorElement />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
