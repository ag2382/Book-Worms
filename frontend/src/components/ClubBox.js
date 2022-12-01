import React from "react";
import "./ClubBox.scss"

export default function ClubBox({ title, book, img, role=null }) {
    return (
        <div className="club-box">
            <div id="title">Club: {title}</div>
            <div id="book">Book: {book}</div>
            {
                role && <div id="role">Role: {role}</div>
            }
            <img className="mt-3" src={img} />
        </div>
    )
}