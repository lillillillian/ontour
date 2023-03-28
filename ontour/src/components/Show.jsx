import React from "react";
import '../index.css';

export default function Show(props)
{
    return(
        // <a href="#">
            <div id="show-row" class="row justify-content-center py-3 show">
                <div class="col-12 col-md-4 align-self-center">
                    <div class="fw-bold schedule-font">
                        {props.date}
                    </div>
                    <div class="schedule-subfont">
                        {props.time}
                    </div>
                </div>
                <div class="d-none d-md-block col-md-7 show-location align-self-center">
                    <div class="fw-bold schedule-font">
                        {props.event}
                    </div>
                    <div class="schedule-subfont">
                        {props.venue} - {props.city}, {props.state}
                    </div>
                    <div class="schedule-subfont">
                        Tickets from <strong>{props.price}</strong>
                    </div>
                </div>         
                <div class="d-none d-xl-block col-xl-1 align-self-center">
                    •
                </div>
            </div>
        // </a>
    );
}
