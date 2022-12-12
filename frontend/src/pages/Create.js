import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import React, {useState} from "react";
import Header from "../components/Header";
import "./Create.scss"

export default function Create() {
    const {user} = useAuth0()
    const [clubName, setClubName] = useState("")
    const [clubDesc, setClubDesc] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        let clubNameObj = document.getElementById("club-name");
        let clubTitleObj = document.getElementById("club-desc");
        postClub()
        clubNameObj.value = "";
        clubTitleObj.value = "";
        setClubName("")
        setClubDesc("")
    }

    const postClub = () => {
        axios.post("/api/club/create", {
                user_id: user.sub,
                club_name: clubName,
                club_desc: clubDesc
        })
        .then(function (response) {
            window.location.replace(window.location.origin);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <div className="mt-3 create">
            <Header title={"Create"} context={"Create a club."} />
            <form id="create-form" onSubmit={handleSubmit}>
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