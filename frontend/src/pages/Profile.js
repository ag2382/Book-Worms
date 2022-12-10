import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
      <div className="mt-3">
        <img src={user.picture} alt={user.name} />
        <h5>Username: {user.name}</h5>
        <h5>{user.email}</h5>
      </div>
  );
};

export default Profile;