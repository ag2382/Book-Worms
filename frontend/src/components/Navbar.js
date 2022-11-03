import React from "react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ProfileIcon from "./ProfileIcon";
import { Link } from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react";

export default function BookWormsNavbar() {
    const { isAuthenticated } = useAuth0();

    return (
        <nav className="navbar">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    BookWorms
                </Link>
                <ul className="navbar-nav mr-auto">
                    {isAuthenticated ? (
                            <li className="nav-item">
                                <LogoutButton />
                                <Link to="/profile">
                                    <ProfileIcon />
                                </Link>
                            </li>
                    ) : (
                        <li className="nav-item">
                            <LoginButton />
                        </li>
                        )}
                </ul>
            </div>
        </nav>
    );
}
