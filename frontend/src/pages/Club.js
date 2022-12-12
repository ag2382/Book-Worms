import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import "./Club.scss"
import ClubCard from "../components/ClubCard";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import no_image from "../no-image.jpg"

export default function Club() {
    let {clubId} = useParams();
    const {user} = useAuth0();
    const [bookTitle, setBookTitle] = useState("")
    const [bookDesc, setBookDesc] = useState("")
    const [bookLink, setBookLink] = useState("")
    const [discussions, setDiscussions] = useState([]);
    const [clubInfo, setClubInfo] = useState([]) 

    const getDiscussions = (id) => {
        axios.get(`/api/clubs/discussion/${id}`)
        .then(function (response) {
            setDiscussions(response.data.discussions);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const getClubInfo = (id) => {
        axios.get(`/api/clubs/info/${id}`)
        .then(function (response) {
            setClubInfo(response.data.info);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const postDiscussion = (clubId) => {
        axios.post(`/api/clubs/add_book/${clubId}`, {
                book_title: bookTitle,
                book_desc: bookDesc,
                book_img: bookLink

        })
        .then(function (response) {
            window.location.reload();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(()=> {
        getClubInfo(clubId);
        getDiscussions(clubId)
    }, [])
    
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

        postDiscussion(clubId)

    }

    return (
        <div className="club mt-3">
            {
                clubInfo &&
                <Header title={clubInfo.name} context={clubInfo.desc} />
            }
            {(discussions.length > 0) &&
                <>
                    <Header sub_title={`Currently Reading: ${discussions[0].name}`} context={discussions[0].desc} />
                    <img src={discussions[0].img ? discussions[0].img : no_image} height="500px" width="350px" className="mb-3" /><br />
                </>
            }
            {user.sub == clubInfo.owner &&
                <button onClick={handleNewBook}>New Book</button>
            }
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
                        <ClubCard title={discussion.name}  date={discussion.start_date} link={`/club/${clubId}/discussion/${discussion.id}`} key={index} />
                    ))
                }
            </div>
        </div>

    )
}