import React, {useState} from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import "./Discussion.scss"
import star from "../star.webp"

{/* <img src={star} height="20px" width="20px"/> */}

export default function Discussion() {
    const [reviews, setReviews] = useState([{user: "cgr28@njit.edu", time: "12/3/2022", rating: 5, review: "I really enjoyed this book.  Would highly recommend."}, {user: "cgr28@njit.edu", time: "12/3/2022", rating: 5, review: "I really enjoyed this book.  Would highly recommend."}])
    const [discussionReview, setDiscussionReview] = useState("")
    const [rating, setRating] = useState(1);
    const [discussionInfo, setDiscussionInfo] = useState({book: "Lorem Ipsum", startDate: "10/10/2022"});

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
            document.getElementById("discussion-reply-text").value = "";
            document.getElementById("rating").value = "";
            setDiscussionReview("")
        }
    }

    return (
        <div className="mt-3 discussion">
            <Header title={`Discussion for ${discussionInfo.book}`} context={`Started: ${discussionInfo.startDate}`} />
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
                        <div className="review card" key="index">
                            <nav className="navbar navbar-light bg-light">
                                <div className="container">
                                    <p className="">{review.user}</p>
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">{review.time}</li>
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