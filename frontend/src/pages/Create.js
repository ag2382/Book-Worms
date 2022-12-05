import { useAuth0 } from "@auth0/auth0-react";
import React, {useState} from "react";
import Header from "../components/Header";

export default function Create() {
    const [bookTitle, setBookTitle] = useState("")
    const [bookDesc, setBookDesc] = useState("")
    const [bookLink, setBookLink] = useState("")
    const [clubName, setClubName] = useState("")
    const [clubDesc, setClubDesc] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(bookTitle)
        console.log(bookDesc)
        console.log(bookLink)
        console.log(clubName)
        console.log(clubDesc)
    }

    return (
        <div className="mt-3">
            <Header title={"Create"} context={"Create a club."} />
            <Header title={"Book info"} context={"This is information for your club's first book."} />
            <form onSubmit={handleSubmit}>
                <label>
                    Book title
                    <input type="text" onChange={(event) => setBookTitle(event.target.value)} />
                </label>
                <br />
                <label>
                    Book description
                    <input type="text" onChange={(event) => setBookDesc(event.target.value)} />
                </label>
                <br />
                <label>
                    Book purchase link
                    <input type="url" onChange={(event) => setBookLink(event.target.value)} />
                </label>
                <Header title={"Club info"} />
                <label>
                    Club name
                    <input type="text" onChange={(event) => setClubName(event.target.value)} />
                </label>
                <br />
                <label>
                    Club description
                    <input type="text" onChange={(event) => setClubDesc(event.target.value)} />
                </label>
                <br />
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}