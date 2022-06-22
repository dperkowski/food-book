import React, { useEffect, useState } from "react";

const UserProfile = () => {
  const defaultDataStructure = {
    id: 164,
    email: "test@test.pl",
    password: "123123",
    favRecipes: [1, 2, 3, 4, 5],
  };

  const [loggedUser, setLoggedUser] = useState({ ...defaultDataStructure });

  return (
    <div className="container mt-auto">
      <div className="row">
        <h1 className="display-1 mb-4 text-center">User profile</h1>
      </div>

      <div className="row">
        <h2 className="display-2 mb-4 text-center">
          Hello, {loggedUser.email}
        </h2>
      </div>
    </div>
  );
};

export default UserProfile;
