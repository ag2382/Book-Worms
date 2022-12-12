import { useAuth0 } from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import axios from "axios";
import "./Home.scss"

// {name: "Thrill Seekers", book: "The Sleep Experiment", owner: false, reviewDue: 5}

export default function Home() {
    const [clubs, setClubs] = useState();
    const {user, isAuthenticated} = useAuth0()

    const getClubs = () => {
        axios.get('/api/clubs/user', {
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

    
    useEffect(() => {
        if (isAuthenticated) {
            getClubs()
        }
    }, [isAuthenticated])
    
    if (!isAuthenticated) {
        return (
            <div>
                Login to view clubs.
            </div>
        )
    }
    return (
        <div className="mt-3 home">
            <Header title={"My Clubs"} context={"All of your joined clubs will appear here."}/>
            <div className="mb-5">
                    {
                        clubs?.map((club, index) => (
                            <ClubCard title={club.name} link={`club/${club.id}`} desc={club.desc} owner={club.owner==user.sub} key={index} />
                        ))
                    }
            </div>
        </div>
    )
}