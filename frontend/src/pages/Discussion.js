import { useAuth0 } from "@auth0/auth0-react";
import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Discussion.scss"

{/* <img src={star} height="20px" width="20px"/> */}

export default function Discussion() {
    let {user} = useAuth0()
    let {clubId, discussionId} = useParams()
    const [reviews, setReviews] = useState()
    const [discussionReview, setDiscussionReview] = useState("")
    const [rating, setRating] = useState("");
    const [discussionInfo, setDiscussionInfo] = useState({name: "Lorem Ipsum", date: "10/10/2022"});

    const handleDiscussionAdd = (event) => {
        event.target.style.display = "none";
        document.getElementById("discussion-reply").style.display = "block";
    }

    const handleDiscussionPost = (event) => {
        event.preventDefault()
        let review = document.getElementById("discussion-reply-text");
        let bookRating = document.getElementById("rating");
        if (review.value.replace(/\s/g, '').length) {
            console.log(discussionReview)
            console.log(rating)
            postDiscussion(clubId, discussionId)
            document.getElementById("discussion-reply-text").value = "";
            document.getElementById("rating").value = "";
            setDiscussionReview("")
            setRating("")
        }
    }

    const getDiscussionInfo = (id) => {
        axios.get(`/api/clubs/book/info/${id}`)
        .then(function (response) {
            setDiscussionInfo(response.data.info);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const getReviews = (id) => {
        axios.get(`/api/clubs/get/review/${id}`)
        .then(function (response) {
            setReviews(response.data.reviews);
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })
    } 

    const postDiscussion = (clubId, bookId) => {
        axios.post(`/api/clubs/post/review/${clubId}/${bookId}`, {
                rating: rating,
                review: discussionReview,
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
        getDiscussionInfo(discussionId)
        getReviews(discussionId)
    }, [])

    return (
        <div className="mt-3 discussion">
            <Header title={`Discussion for ${discussionInfo.name}`} context={`Started: ${discussionInfo.date}`} />
            <button onClick={handleDiscussionAdd} id="discussion-add" className="mb-3">Add to the discussion</button>
            <div id="discussion-reply" className="discussion-reply mb-3">
                <form onSubmit={handleDiscussionPost} id="discussion-from">
                    <label className="required" htmlFor="rating">Rating out of 5</label><br/>
                    <input placeholder="1" id="rating" className="mb-3" type="number" min="1" max="5" onChange={(event) => setRating(event.target.value)} required /><br/>
                    <label className="required" htmlFor="discussion-reply-text">Review</label>
                    <textarea placeholder="Enter a review..." htmlFor="discussion-form" id="discussion-reply-text" onChange={(event) => setDiscussionReview(event.target.value)} className="px-2 py-3" required></textarea>
                    <input className="mb-3" id="discussion-post-btn" type="submit" value="Post" />
                </form>
            </div>
            {
                    reviews?.map((review, index) => (
                        <div className="review card" key={index}>
                            <nav className="navbar navbar-light bg-light">
                                <div className="container">
                                    <p className="">{review.member_id}</p>
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">{review.date}</li>
                                        <li className="nav-item">Rating: {review.rating}/5</li>
                                    </ul>
                                </div>
                            </nav>
                            <div className="card-body">
                                <p className="card-text">{review.review}</p>
                            </div>
                        </div>
                    ))
                }
        </div>
    )
}