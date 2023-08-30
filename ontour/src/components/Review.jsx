import React, { useEffect } from "react";
import PropTypes from "prop-types";
import '../index.css';
import { RiStarFill } from "react-icons/ri"
import { AiOutlineUser } from "react-icons/ai"
import { useState } from 'react';
import { HelpfulButton } from "./Buttons";
import { createClient } from '@supabase/supabase-js'
import { UnhelpfulButton } from "./Buttons";
import artist_styles from "../Styles/artist_styles";
import { useAuth0 } from "@auth0/auth0-react";

const review_styles = artist_styles.review_display.review;

export default function Review(props) {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [isHelpfulActive, setIsHelpfulActive] = useState(isAuthenticated && !props.likedUsers.includes(user.username));
    const [isUnhelpfulActive, setIsUnhelpfulActive] = useState(isAuthenticated && !props.dislikedUsers.includes(user.username));
    const [count, setCount] = useState(props.count);
    const reviewTable = props.reviewTable;
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

    const handleHelpful = event => {

        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsHelpfulActive(current => !current);
        if(isHelpfulActive) {
            setCount(count + 1);
            addLikedUser(user.username);
            postData(count + 1);
        }
        else {
            setCount(count - 1);
            removeLikedUser(user.username);
            postData(count - 1);
        }
    };

    const handleUnHelpful = event => {
        event.currentTarget.classList.toggle('fw-bold');
        event.currentTarget.classList.toggle('btn-outline-light');
        setIsUnhelpfulActive(current => !current);
        if(isUnhelpfulActive) {
            setCount(count - 1);
            addUnlikedUser(user.username);
            postData(count - 1);
        }
        else {
            setCount(count + 1);
            removedUnlikedUser(user.username);
            postData(count + 1);
        }
    }

    const addLikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ likedUsers: [...props.likedUsers, user] })
            .eq('id', props.id)
    }

    const removeLikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ likedUsers: props.likedUsers.filter(u => u != user) })
            .eq('id', props.id)
    }

    const addUnlikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ dislikedUsers: [...props.dislikedUsers, user] })
            .eq('id', props.id)
    }

    const removedUnlikedUser = async (user) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ dislikedUsers: props.dislikedUsers.filter(u => u != user) })
            .eq('id', props.id)
    }

    const postData = async (currCount) => {
        const {data, error} = await supabase
            .from(reviewTable)
            .update({ likeCount: currCount })
            .eq('id', props.id)
    }

    return (
        <div style={review_styles.item}>
            <div class="d-flex bd-highlight">
                <div class="p-1 bd-highlight"><AiOutlineUser size={23} /> </div>
                <div class="p-1 bd-highlight"><h6 class="review-user">{props.user}</h6></div>
                <br></br>
            </div>
            <div>
                <div class="d-flex bd-highlight mb-2">
                    {[...Array(props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#faaf00"}
                                size={20}
                            />
                        );
                    })}
                    {[...Array(5 - props.rating)].map(star => {
                        return (
                            <RiStarFill
                                className="star"
                                color={"#bdbdbd"}
                                size={20}
                            />
                        );
                    })}
                </div>
                <div align="left" class="d-flex bd-highlight mb-2">
                    <small>{props.date} • {props.venue}</small>
                </div>
            </div>
            <div class="d-flex w-100 justify-content-start">
                <p id="rating-text" style={{ whiteSpace: "pre-wrap" }} class="mb-2" align="left">{props.text}</p>
            </div>
            {isAuthenticated ? 
                <>
                <div className = "d-flex justify-content-start" >
                    <div className="mr-3">
                        <HelpfulButton onPress={handleHelpful} isHelpfulActive={isHelpfulActive} isUnhelpfulActive={isUnhelpfulActive} />
                    </div>
                    <span className="count" style={{margin:"10px"}}>{count}</span>
                    <div>
                        <UnhelpfulButton onPress={handleUnHelpful} isUnhelpfulActive={isUnhelpfulActive} isHelpfulActive={isHelpfulActive}/>
                    </div>
                </div>
                </>
                : <></> }
        </div>
    )
}

Review.propTypes = {
    user: PropTypes.string,
    rating: PropTypes.number,
    date: PropTypes.string,
    venue: PropTypes.string,
    text: PropTypes.string
};