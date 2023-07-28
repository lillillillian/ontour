import React from "react";
import PropTypes from "prop-types";
import '../index.css';
import Rating from '@mui/material/Rating';
import { useState, useEffect, useRef } from "react";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Divider, Box } from "@mui/material";
import OnTourButton from "./OnTourButton";
import artist_styles from "../Styles/artist_styles";
import common_styles from "../Styles/common_styles";
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Grid } from "@mui/material";
import header_styles from "../Styles/header_styles";
import { createClient } from '@supabase/supabase-js'
import ImageModal from "./ImageModal";

const modal_styles = artist_styles.oldModal;
const window_breakpoints = common_styles.window_breakpoints;
const styles = artist_styles.header;
const verified = artist_styles.verifiedButton;

function ChildModal(props) {
    console.log("childmodal props: ", props);
    useEffect(() => {
        console.log(props.imageData);
    }, [props.imageData])

    return (
        <ImageModal
            open={props.open}
            handleClose={props.onClose}
            imageData={props.imageData}
            image={props.image}
        />
    );
}

ChildModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    imageData: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
};



/*
optional prop made for the festival pages.
    background_position: sets the background position of the image
*/
function ArtistHeader(props) {
    // console.log("ArtistHeader props: ", props);
    const [images, setImages] = useState([]);
    const [imageLoad, setImageLoad] = useState(false);
    const [isMobile, setIsMobile] = useState(window_breakpoints.md >= window.innerWidth)
    const [model, setModel] = useState(false);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const [isChildModalOpen, setIsChildModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageData, setImageData] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const supabase = createClient('https://zouczoaamusrlkkuoppu.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpvdWN6b2FhbXVzcmxra3VvcHB1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3ODE1ODUyMSwiZXhwIjoxOTkzNzM0NTIxfQ.LTuL_u0tzmsj8Zf9m6JXN4JivwLq1aRXvU2YN-nDLCo');

    const starBoxRef = useRef(null);
    const totalReviewTextRef = useRef(null);

    const handleResize = () => {
        console.log("Resize event triggered");
        if (starBoxRef.current) {
            const starBoxHeight = starBoxRef.current.offsetHeight;
            const starBoxWidth = starBoxRef.current.offsetWidth;
            totalReviewTextRef.current.style.fontSize = `${starBoxHeight * 0.72}px`;
            totalReviewTextRef.current.style.marginLeft = `${starBoxWidth * 0.05}px`;
        }
        setIsMobile(window_breakpoints.md >= window.innerWidth)
    }

    const useBeforeRender = (callback, deps) => {
        const [isRun, setIsRun] = useState(false);

        if (!isRun) {
            callback();
            setIsRun(true);
        }

        useEffect(() => () => setIsRun(false), deps);
    };
    useBeforeRender(() => handleResize(), []);

    const handleAllPhotosClick = () => {
        setOpen(true);
        setModel(true);
    }

    const handleImageClick = async (image) => {
        const { data, error } = await supabase
            .from('artist_images')
            .select('*')
            .eq('image_url', image.target.src)
            .single();

        if (error) {
            console.error(error);
            return null;
        }
        setImageData(data);
        setSelectedImage(image.target.src);
        setIsChildModalOpen(true);
    }

    const handleCloseChildModal = () => {
        setSelectedImage(null);
        setImageData(null);
        setIsChildModalOpen(false);
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    useEffect(() => {
        if (props.images.length > 0) {
            setImageLoad(true);
            setImages(props.images);
            console.log("setting images");
            console.log(props.images);
        }
        console.log("adding event listener for resize");
        window.addEventListener("resize", handleResize);
    }, [props.images])

    return (
        <div
            style={{
                backgroundImage: isMobile ?
                    `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url("${props.image}")`
                    : `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url("${props.image}")`,
                backgroundPosition: props.background_position ?
                    props.background_position :
                    (isMobile ? `center` : `none`),
                backgroundRepeat: `no-repeat`,
                backgroundSize: `cover`,
                height: `50vh`,
                position: `relative`,
                display: `flex`,
                flexDirection: 'column-reverse'
            }}
        >
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // wrap
                flexWrap: 'wrap-reverse',
            }}>
                <div style={artist_styles.header.Container}>
                    {props.isVenue == 0 && props.onTour && <OnTourButton></OnTourButton>}

                    <h1 style={artist_styles.header.ArtistName} class="fw-bold">{props.name} {props.isVenue == 1 && props.verified && <img src="images/verifiedBadge.png" style={verified}></img>}
                        <br></br><span class="fw-light fs-3">{props.city}</span>
                    </h1>
                    <Divider style={styles.Divider} />
                    <div style={styles.RatingRow}>
                        <Rating
                            ref={starBoxRef}
                            name="text-feedback"
                            value={props.rating}
                            // size="large"
                            sx={{ fontSize: "3em" }}
                            readOnly
                            precision={0.1}
                            emptyIcon={<StarBorderOutlinedIcon style={styles.StarsIcon} fontSize="inherit" />}
                        />
                        <h1 ref={totalReviewTextRef} style={styles.TotalReviewsText}>({props.total})</h1>
                    </div>
                </div>
                <div style={header_styles.button_position}>
                    <Button
                        style={header_styles.button}
                        variant="outlined"
                        type='submit'
                        onClick={handleAllPhotosClick}>
                        See All {images.length} {images.length === 1 ? 'Photo' : 'Photos'}
                    </Button>
                </div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={modal_styles.container}>
                        <Grid item xs={12} container spacing={2}>
                            <Grid item xs={12}>
                                <h1 style={{ color: "black" }} class="homebanner">Photos of {props.name}</h1>
                            </Grid>
                            {images.map((image, index) => {
                                return (
                                    <Grid item xs={6} md={4} lg={3}>
                                        <div
                                            // onClick={() => {handleTileClick()}}
                                            style={header_styles.imageTile.container}
                                        >
                                            <img
                                                src={image}
                                                style={{
                                                    ...header_styles.imageTile.image,
                                                    ...(index === hoveredIndex && header_styles.imageTile.imageHover),
                                                }}
                                                onClick={handleImageClick}
                                                onMouseEnter={() => {
                                                    handleMouseEnter(index)
                                                }}
                                                onMouseLeave={() => {
                                                    handleMouseLeave();
                                                }}
                                            />
                                        </div>
                                    </Grid>
                                );
                            })}
                        </Grid>
                        {selectedImage && (
                            <ChildModal
                                image={selectedImage}
                                open={isChildModalOpen}
                                imageData={imageData}
                                onClose={handleCloseChildModal}
                            />
                        )}
                    </Box>
                </Modal>
            </Box>

        </div>

    )
}

export default ArtistHeader;

/*
{
    "name": "SoFi Stadium",
    "rating": 0,
    "total": 0,
    "image": "https://media.nbcsandiego.com/2020/08/SoFI-Blur-best.jpg?quality=85&strip=all",
    "isVenue": 1,
    "city": "Los Angeles, California",
    "onTour": false,
    "verified": false,
    "images": []
}
*/
ArtistHeader.propTypes = {
    name: PropTypes.string,
    rating: PropTypes.number,
    total: PropTypes.number,
    image: PropTypes.string,
    isVenue: PropTypes.number,
    city: PropTypes.string,
    onTour: PropTypes.bool,
    verified: PropTypes.bool,
    images: PropTypes.arrayOf(PropTypes.string),
    background_position: PropTypes.string,
};
