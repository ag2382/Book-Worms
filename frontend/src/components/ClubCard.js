import React from "react";
import "./ClubCard.scss"

export default function ClubCard({ link, title, desc, book, owner, date }) {

    return (
        <a href={link} className="club-card">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{desc}</p>
                    {book && <p className="card-text reading">Currently reading: {book}</p>}
                    {(owner != undefined) && <p className="owner">Role: {owner ? "Owner" : "Member"}</p>} 
                    {date && <p className="reading">Start date: {date}</p>} 
                </div>
            </div>
        </a>
    )
}