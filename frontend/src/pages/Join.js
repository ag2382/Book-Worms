import { useAuth0 } from "@auth0/auth0-react";
import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import "./Join.scss"

export default function Create() {
    const [clubs, setClubs] = useState()
    const [clubSearch, setSearch] = useState("")
    const {user} = useAuth0()
    
    const getLatestClubs = () => {
        axios.get('/api/clubs/latest', {
            params: {
                user_id: user.sub
            }
        })
        .then(function (response) {
            setClubs(response.data.clubs);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    const getSearchResults = () => {
        axios.get('/api/clubs/search', {
            params: {
                search: clubSearch,
                user_id: user.sub
            }
        })
        .then(function (response) {
            setClubs(response.data.clubs);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
    const postJoinClub = (id) => {
        axios.post(`/api/clubs/join/${id}`, {
            user_id: user.sub
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    useEffect(() => {
        getLatestClubs()
    }, [])
    
    const handleSubmit = (event) => {
        event.preventDefault();
        getSearchResults()
    }

    const handleLatest = (event) => {
        getLatestClubs()
    }
    
    const handleJoin = (event) => {
        console.log(event.target.id)
        console.log(user.sub)
        postJoinClub(event.target.id)
        event.target.disabled = true;
        event.target.innerText = "Joined"
    }

    return (
        <div className="mt-3 join">
            <Header title={"Join"} context={"Join a club."} />
            <nav class="navbar navbar-light bg-light">
                <div className="container">
                    <form className="form-inline" onSubmit={handleSubmit}>
                        <input id="search" type="search" placeholder="Search" aria-label="Search" onChange={(event) => setSearch(event.target.value)} />
                        <input className="mx-2" type="submit" value={"Search"} />
                    </form>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><button className="filter" onClick={handleLatest}>Latest</button></li>
                    </ul>
                </div>
            </nav>
            {
                    clubs?.map((club, index) => (
                            <div className="card join-club" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">{club.name}</h5>
                                    <p className="card-text">{club.desc}</p>
                                    {/* <p className="card-text reading">Currently reading: {club.book}</p> */}
                                    <button id={club.id} onClick={handleJoin} disabled={club.joined}>{club.joined ? "Joined" : "Join"}</button>
                                </div>
                            </div>
                    ))
                }
        </div>
    )
}