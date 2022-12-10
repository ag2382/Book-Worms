import React, {useState} from "react";
import Header from "../components/Header";
import "./Club.scss"
import ClubCard from "../components/ClubCard";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Club() {
    let {clubId} = useParams();
    const {user} = useAuth0()
    const [ownerId, setOwnerId] = useState("11212331");
    const [bookTitle, setBookTitle] = useState("")
    const [bookDesc, setBookDesc] = useState("")
    const [bookLink, setBookLink] = useState("")
    const [discussions, setDiscussions] = useState([{book: "Lorem Ipsum", date: "10/22/2022", id: 1}]);
    const [clubInfo, setClubInfo] = useState({name: "Lorem Ipsum", book: {name: "Lorem Ipsum the Book", img: "https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/streams/2014/April/140414/2D274905625233-061026_captainundies_vmed_4p.jpg", description: "It's a book."}, description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"})
    
    const handleNewBook = (event) => {
        event.target.style.display = "none";
        document.getElementById("new-book").style.display = "block";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let bookTitleObj = document.getElementById("book-title");
        let bookDescObj = document.getElementById("book-description");
        let bookImgObj = document.getElementById("img-link");

        bookTitleObj.value = "";
        bookDescObj.value = "";
        bookImgObj.value = "";

        console.log(bookTitle)
        console.log(bookDesc)
        console.log(bookLink)

    }

    return (
        <div className="club mt-3">
            <Header title={clubInfo.name} context={clubInfo.description} />
            <Header sub_title={`Currently Reading: ${clubInfo.book.name}`} context={clubInfo.book.description} />
            <img src={clubInfo.book.img} height="500px" width="350px" className="mb-3" /><br />
            <button onClick={handleNewBook}>New Book</button>
            <div id="new-book">
                    <form id="book" onSubmit={handleSubmit}>
                    <label htmlFor="book-title" className="required">Book Title</label><br />
                    <input id="book-title" type="text" onChange={(event) => setBookTitle(event.target.value)} className="mb-3" required />
                    <br />
                    <label htmlFor="book-description" className="required">Book Description</label><br />
                    <textarea htmlFor="new-book" id="book-description" type="text" onChange={(event) => setBookDesc(event.target.value)} className="description mb-3" required />
                    <br />
                    <label htmlFor="img-link">Book Image Link</label><br />
                    <input id="img-link" type="url" onChange={(event) => setBookLink(event.target.value)} className="mb-3" /><br />
                    <input type="submit" value="Create" />
                </form>
            </div>
            <Header sub_title={"Discussions"} context={"These are all of the club's discussions."} />
            {/* put a table with discussion here, when clicked will take them to the disucssion */}
            <div className="mb-5">
                {
                    discussions?.map((discussion, index) => (
                        <ClubCard title={discussion.book}  date={discussion.date} link={`/club/${clubId}/discussion/${discussion.id}`} key={index} />
                    ))
                }
            </div>
        </div>

    )
}