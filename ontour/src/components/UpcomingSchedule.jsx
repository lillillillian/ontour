import React from "react";
import '../index.css';
import Show from "./Show";
import {useState, useEffect} from "react";

export default function UpcomingSchedule(props)
{
    const [eventArray, setEventArray] = useState([{name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."},
    {name: "Loading...", date: "Loading...", eventId: "Loading...", eventURL: "Loading...", timezone: "Loading...", eventTime: "Loading..."}]);
    const [dates, setDates] = useState([]);
    const [show, setShow] = useState(true);
    const performSearch = async () => {
        const tmEvents = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=NwphXHPsTvSzPp0XwvUNdp3vyzE3vEww&keyword=${props.name}&sort=date,asc&size=5`);
        const tmEventData = await tmEvents.json();
        var events = [];
        if(tmEventData.page.totalElements > 0) {
            for(let i = 0; i < tmEventData._embedded.events.length; i++){
                if(events.length < 5){
                    var name = tmEventData._embedded.events[i].name;
                    var date = tmEventData._embedded.events[i].dates.start.localDate;
                    var timezone = tmEventData._embedded.events[i].dates.timezone;
                    if(!timezone)
                    {
                        timezone = " ";
                    }
                    var eventId = tmEventData._embedded.events[i].id;
                    var eventURL = tmEventData._embedded.events[i].url;
                    var eventTime = tmEventData._embedded.events[i].dates.start.localTime;
                    const event = {
                    name: name,
                    date: date,
                    timezone: timezone,
                    eventId: eventId,
                    eventURL: eventURL,
                    eventTime: eventTime
                    }
                    events.push(event);
                }
            }
            for(let i = 0; i < events.length; i++){
                eventArray[i] = events[i];
                const[year, month, day] = events[i].date.split("-");
                const newData = new Date(+year, month - 1, +day);
                var weekday = newData.toString().split(" ")[0];
                var monthStr = newData.toString().split(" ")[1];
                var dayStr = newData.toString().split(" ")[2];
                var fullDate = weekday + " " + monthStr + " " + dayStr;
                dates[i] = fullDate;
            }
        }
        else{
            setShow(false);
        }
    
        
    }
    useEffect(() => {
        performSearch();
      }, [props.name]);
    

    return (
        <div class="container shows">
            <div class="row justify-content-center py-3 show">
                <h4 class="fw-bold d-none d-sm-block">Upcoming Shows</h4>
                <h4 class="fw-bold d-block d-sm-none">Shows</h4>
            </div>

            {show
            ?
            <div>
            <a href={eventArray[0].eventURL} target="_blank">
                <Show time = {eventArray[0].eventTime} date={dates[0]} event={eventArray[0].name} location={eventArray[0].timezone.split('/')[1]}/>
            </a>
            <a href={eventArray[1].eventURL} target="_blank">
                <Show time = {eventArray[1].eventTime} date={dates[1]} event={eventArray[1].name} location={eventArray[1].timezone.split('/')[1]}/>  
            </a>
            <a href={eventArray[2].eventURL} target="_blank">
                <Show time = {eventArray[2].eventTime} date={dates[2]} event={eventArray[2].name} location={eventArray[2].timezone.split('/')[1]}/>
            </a>
            <a href={eventArray[3].eventURL} target="_blank">
                <Show time = {eventArray[3].eventTime} date={dates[3]} event={eventArray[3].name} location={eventArray[3].timezone.split('/')[1]}/>
            </a>
            <a href={eventArray[4].eventURL} target="_blank">
                <Show time = {eventArray[4].eventTime} date={dates[4]} event={eventArray[4].name} location={eventArray[4].timezone.split('/')[1]}/>
            </a>
            </div>
            :<p>No Upcoming Shows</p>}
           
            {/* <div class="row justify-content-center pt-3">
                <button id="upcoming-btn">See more</button>
            </div> */}
        </div>
    );
}
