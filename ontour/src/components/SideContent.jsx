// New sidebar component for artist page
import React from "react";
import "../index.css";
import UpcomingSchedule from "./UpcomingSchedule";
import VenueUpcomingSchedule from "./VenueUpcomingSchedule";
import ExternalLink from "./ExternalLink";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";

import artist_styles from "../Styles/artist_styles";
import FestivalUpcomingSchedule from "./FestivalUpcomingSchedule";
const sidebar_styles = artist_styles.sidebar;

/*
Props:
    name: venue or artist name
    linkPairs [][2]: array of pairs, link and icon link
*/

const SideContent = ({name, linkPairs, venue, festival}) => {
    console.log("name: " + name);
    if(venue)
    {
        console.log("yes");
    }
    else
    {
        console.log("no");
    }
    return (
        <div style={{ position: "sticky", top: "15px" }}>
            <Box sx={sidebar_styles.box}>
                <a href="#review">
                    <button id="writebutton" type="button" class="btn btn-dark fw-bold">
                        <div class="row">
                            <div class="col-md-3">
                                <img id="review-icon" src="../../images/review.png" alt=""></img>
                            </div>
                            <div id="write-a-review" class="d-none d-md-block col-md-9">
                                Write a Review
                            </div>
                        </div>
                    </button>
                </a>
                {linkPairs && 
                <div style={sidebar_styles.icon_container}>
                    {
                        linkPairs.map((pair) => {
                            return <ExternalLink mediaLink={pair[0]} iconLink={pair[1]} />
                        })
                    }
                </div> }
                {festival && <FestivalUpcomingSchedule name={name} />}
                {venue && <VenueUpcomingSchedule name={name} />}
                {!venue && !festival && <UpcomingSchedule name={name} />}
                {/* {venue && !festival ? <VenueUpcomingSchedule name={name} /> : <UpcomingSchedule name={name} /> } */}
                {/* <VenueUpcomingSchedule name={name} /> */}
                {/* <a href="#">
            <img id="arrow" src="../../images/arrow.png" alt=""></img>
            </a> */}
            </Box>
        </div>
    );
}



export default SideContent;