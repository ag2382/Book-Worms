import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./ProfileIcon.scss"

export default function ProfileIcon() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
          <img id="profile-img" src={user.picture} alt={user.name} />
    )
  );
};