import React, {useState} from "react";
import Header from "../components/Header";
import ClubCard from "../components/ClubCard";
import "./Home.scss"

// {name: "Thrill Seekers", book: "The Sleep Experiment", owner: false, reviewDue: 5}

export default function Home() {
    const [clubs, setClubs] = useState([
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: true, id: 1},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, id: 2},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, id: 3},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, id: 4},
                    {name: "Lorem Ipsum", book: "Lorem Ipsum", owner: false, id: 5},
                    ]);

    return (
        <div className="mt-3 home">
            <Header title={"My Clubs"} context={"These are all of your active clubs!"}/>
            <div className="mb-5">
                    {
                        clubs?.map((club, index) => (
                            <ClubCard title={club.name} link={`club/${club.id}`} book={club.book} owner={club.owner} key={index} />
                        ))
                    }
            </div>
        </div>
    )
}