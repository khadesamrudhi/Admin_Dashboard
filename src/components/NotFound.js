import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold text-gray-700">404 - Page Not Found</h1>
      <p className="text-gray-500 mt-4">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
