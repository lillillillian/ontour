import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import polaroid_styles from "../Styles/polaroid_styles";
import { Translate } from "@mui/icons-material";

/* 
expected props:
    - imageURL: string
    - link (optional): string (if not provided, the polaroid will not be clickable
*/
const Polaroid = (props) => {
    return (
        <>
            {
                (props.url.includes('mp4')||props.url.includes('mkv')||props.url.includes('x-m4v')) ?
                <><div onClick={props.onPress}   style={polaroid_styles.polaroid_container} >
                <video src={props.url} class="d-block w-100" style={polaroid_styles.polaroid_image} alt="..." />
            </div>
            <div     style={{backgroundColor:'rgba(0,0,0,.7)', color: 'white',position:'absolute',top:'50%',left:'50%',transform:"translate(-50%,-50%)", zIndex:1,width:"4rem",height:"3rem",display:"flex",alignItems:'center',justifyContent:'center',borderRadius:'10px',cursor:'pointer' }} ><PlayArrowIcon   style={{width:"2rem",height:'2rem'}}  /></div></>
                     :
                    <div onClick={props.onPress} style={polaroid_styles.polaroid_container} >
                        <img src={props.url} class="d-block w-100" style={polaroid_styles.polaroid_image} alt="..." />
                    </div>

            }

        </>
    )
}

export { Polaroid };

Polaroid.propTypes = {
    onPress: PropTypes.func,
    imageURL: PropTypes.string,
    link: PropTypes.string
};