import React from 'react';

const WriteReviewButton = () => {
    return (
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
    )
}

export default WriteReviewButton;