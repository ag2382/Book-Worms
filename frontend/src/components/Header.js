import React from "react";
import "./Header.scss"

export default function Header({ title, context=null }) {
    return (
        <div className="header mb-3">
            <h3>{title}</h3>
            {
                context
            }
        </div>
    )
}