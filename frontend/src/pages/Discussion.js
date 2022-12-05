import React, {useState} from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import "./Discussion.scss"

export default function Discussion() {
    const [reviews, setReviews] = useState([{user: "cgr28@njit.edu", time: "12/3/2022", rating: 5, review: "I really enjoyed this book.  Would highly recommend"}, {user: "cgr28@njit.edu", time: "12/3/2022", rating: 5, review: "I really enjoyed this book.  Would highly recommend"}])
    return (
        <div className="mt-3 discussion">
            <Header title={"Discussion for Lorem Ipsum"} context={"This is a discussion for Lorem Ipsum which started 10/10/2023"} />
            {
                    reviews?.map((review) => (
                        <div className="review card">
                            <div className="card-body">
                                <p className="card-text">{review.user}</p>
                                <p className="card-text reading">{review.time}</p>
                                <p className="card-text">{review.rating} stars</p>
                                <p className="card-text">{review.review} stars</p>
                            </div>
                        </div>
                    ))
                }
        </div>
    )
}