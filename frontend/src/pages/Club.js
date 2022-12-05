import React, {useState} from "react";
import Header from "../components/Header";
import "./Club.scss"
import { useParams } from "react-router-dom";

export default function Club() {
    let {clubId} = useParams();
    const [discussions, setDiscussions] = useState([{book: "Lorem Ipsum", date: "10/22/2022", id: 1}]);
    const [clubInfo, setClubInfo] = useState({name: "Lorem Ipsum", book: "Lorem Ipsum the Book", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus aliquam pellentesque nunc at porttitor. Aliquam ut consequat est. In vulputate leo eget arcu convallis ultricies. Nullam enim nibh, suscipit sit amet malesuada at, consequat id arcu. Sed vitae nulla quis libero fermentum commodo. Integer non ex sit amet dui semper facilisis"})
    return (
        <div className="club mt-3">
            <Header title={clubInfo.name} context={clubInfo.description} />
            <Header title={"Discussions"} />
            {/* put a table with discussion here, when clicked will take them to the disucssion */}
            <div className="mb-5">
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">Book</th>
                        <th scope="col">Start Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            discussions?.map((discussion, index) => (
                                <tr onClick={() => window.location = `${clubId}/discussion/${discussion.id}`}>
                                    <th scope="row">{index+1}</th>
                                    <td>{discussion.book}</td>
                                    <td>{discussion.date}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>

    )
}