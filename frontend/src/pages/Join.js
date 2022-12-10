import { useAuth0 } from "@auth0/auth0-react";
import React, {useState} from "react";
import Header from "../components/Header";
import "./Join.scss"

export default function Create() {
    const [clubs, setRecentClubs] = useState([
        {id: 1, name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
        {id: 2, name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
        {id: 3, name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
        {id: 4, name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
        {id: 5, name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
    ])
    const [search, setSearch] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(search)
    }

    const handleJoin = (event) => {
        console.log(event.target.id)
        event.target.disabled = true;
        event.target.innerText = "Joined"
    }

    return (
        <div className="mt-3 join">
            <Header title={"Join"} context={"Join a club."} />
            <nav class="navbar navbar-light bg-light">
                <div className="container">
                    <form class="form-inline" onSubmit={handleSubmit}>
                        <input id="search" type="search" placeholder="Search" aria-label="Search" onChange={(event) => setSearch(event.target.value)} />
                        <input class="mx-2" type="submit" value={"Search"} />
                    </form>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"><button className="filter">Top</button></li>
                        <li className="nav-item"><button className="filter" disabled>Latest</button></li>
                    </ul>
                </div>
            </nav>
            {
                    clubs?.map((club, index) => (
                            <div class="card join-club" key={index}>
                                <div class="card-body">
                                    <h5 class="card-title">{club.name}</h5>
                                    <p class="card-text">{club.description}</p>
                                    <p class="card-text reading">Currently reading: {club.book}</p>
                                    <button id={club.id} onClick={handleJoin}>Join</button>
                                </div>
                            </div>
                    ))
                }
        </div>
    )
}