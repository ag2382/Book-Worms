import { useAuth0 } from "@auth0/auth0-react";
import React, {useState} from "react";
import Header from "../components/Header";
import "./Create.scss"

export default function Create() {
    const [bookTitle, setBookTitle] = useState("")
    const [bookDesc, setBookDesc] = useState("")
    const [bookLink, setBookLink] = useState("")
    const [clubName, setClubName] = useState("")
    const [clubDesc, setClubDesc] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        let bookTitleObj = document.getElementById("book-title");
        let bookDescObj = document.getElementById("book-description");
        let bookImgObj = document.getElementById("img-link");
        let clubNameObj = document.getElementById("club-name");
        let clubTitleObj = document.getElementById("club-desc");
        bookTitleObj.value = "";
        bookDescObj.value = "";
        bookImgObj.value = "";
        clubNameObj.value = "";
        clubTitleObj.value = "";
        console.log(bookTitle)
        console.log(bookDesc)
        console.log(bookLink)
        console.log(clubName)
        console.log(clubDesc)
    }

    return (
        <div className="mt-3 create">
            <Header title={"Create"} context={"Create a club."} />
            <Header sub_title={"Book info"} context={"This is information for your club's first book."} />
            <form id="create-form" onSubmit={handleSubmit}>
                <label htmlFor="book-title" className="required">Book Title</label><br />
                    <input id="book-title" type="text" onChange={(event) => setBookTitle(event.target.value)} className="mb-3" required />
                <br />
                <label htmlFor="book-description" className="required">Book Description</label><br />
                    <textarea htmlFor="create-form" id="book-description" type="text" onChange={(event) => setBookDesc(event.target.value)} className="description mb-3" required />
                <br />
                <label htmlFor="img-link">Book Image Link</label><br />
                    <input id="img-link" type="url" onChange={(event) => setBookLink(event.target.value)} className="mb-3" />
                <Header sub_title={"Club info"} />
                <label htmlFor="club-name" className="required">Club Name</label><br />
                    <input id="club-name" type="text" onChange={(event) => setClubName(event.target.value)} className="mb-3" required />
                <br />
                <label htmlFor="club-desc" className="required">Club Description</label><br />
                    <textarea htmlFor="create-form" id="club-desc" type="text" onChange={(event) => setClubDesc(event.target.value)} className="description mb-3" required />
                <br />
                <input type="submit" value="Create" />
            </form>
        </div>
    )
}