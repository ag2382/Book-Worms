import React from "react";
import "./Header.scss"

export default function Header({ title, sub_title, context=null }) {
    return (
        <div className="header mb-3">
            <h3 id="title">{title}</h3>
            <h3 id="sub-title">{sub_title}</h3>
            {
                context
            }
        </div>
    )
}