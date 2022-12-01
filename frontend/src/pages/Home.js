import React, {useState} from "react";
import ClubBox from "../components/ClubBox";
import Header from "../components/Header";import Container from 'react-bootstrap/Container';
import {Row, Col} from 'react-bootstrap';

export default function Home() {
    const {myClubs, setMyClubs} = useState();
    const {joinClubs, setJoinClubs} = useState();
    return (
        <div className="mt-3">
            <Header title={"My Clubs"} context={"These are all of your active clubs!"}/>
            <div className="mb-5">
                <Row>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} role={"Owner"}/>
                    </Col>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} role={"Owner"}/>
                    </Col>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} role={"Owner"}/>
                    </Col>
                </Row>
            </div>
            <Header title={"Recently Created Clubs"} context={"Join a club to become a book worm!"}/>
            <div>
                <Row>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} />
                    </Col>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} />
                    </Col>
                    <Col>
                        <ClubBox title={"Book Club 1"} book={"Captain Underpants"} img={"https://m.media-amazon.com/images/I/51+a+1IsZLL._AC_SY780_.jpg"} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}