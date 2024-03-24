import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes/index.ts";
import MetaTags from "../components/MetaTags.tsx";

const NotFound: React.FC = () => {
  return (
    <>
      <MetaTags
        title="404 - Page Not Found | users-react-test"
        description="Sorry, we couldn’t find the page you’re looking for. Go back home and explore other pages on users-react-test."
      />

      <div className="grid min-h-full place-items-center bg-gray-900 text-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-400">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <NavLink
              to={routes.home}
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back home
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;
