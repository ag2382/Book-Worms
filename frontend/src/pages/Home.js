import React, {useState} from "react";
import ClubBox from "../components/ClubBox";
import Header from "../components/Header";
import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';
import "./Home.scss"

// {name: "Thrill Seekers", book: "The Sleep Experiment", owner: false, reviewDue: 5}

export default function Home() {
    const [clubs, setClubs] = useState([
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5},
                    ]);

    const [recentClubs, setRecentClubs] = useState([
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, reviewDue: 5, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"},
    ])

    

    return (
        <div className="mt-3 home">
            <Header title={"My Clubs"} context={"These are all of your active clubs!"}/>
            <div className="mb-5">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Book</th>
                    <th scope="col">Due (days)</th>
                    <th scope="col">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clubs?.map((club, index) => (
                            <tr onClick={() => window.location = '/join'}>
                                <th scope="row">{index+1}</th>
                                <td>{club.name}</td>
                                <td>{club.book}</td>
                                <td>{club.reviewDue}</td>
                                <td>{club.owner ? "Owner" : "Member"}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
            <Header title={"Recently Created Clubs"} context={"These are our newest clubs!"}/>
                {
                    recentClubs?.map((club) => (
                        <a href="/join" className="recent-club">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">{club.name}</h5>
                                    <p class="card-text">{club.description}</p>
                                    <p class="card-text reading">Currently reading: {club.book}</p>
                                </div>
                            </div>
                        </a>
                    ))
                }
        </div>
    )
}