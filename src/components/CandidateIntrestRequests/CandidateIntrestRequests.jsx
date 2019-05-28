import React from 'react';
import '../../style/intrests-requests.scss';

const CandidateIntrestRequestsCard = ({
  fullname,
  party,
  office,
  adminAcceptRequest,
  id,
  adminRejectRequest,
}) => {
  return (
    <React.Fragment>
      <div className="main-title">
        <div className="image_title_bio">
          <div className="profile_image">
            <img
              className="user_pic"
              src="https://picsum.photos/200/300/?random"
              alt=""
            />
          </div>
          <div className="title_text_box">
            <p className="name">{fullname}</p>
            <p className="user_bio">Party: {party}</p>
            <p className="user_bio">Office of Intrest: {office}</p>
          </div>
        </div>
        <div className="admin_decision_on_request">
          <div className="main_button">
            <button
              type="submit"
              id={id}
              className="btn-accept"
              onClick={adminAcceptRequest}
            >
              Accept
            </button>
            <button
              type="submit"
              id={id}
              className="btn-reject"
              onClick={adminRejectRequest}
            >
              reject
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CandidateIntrestRequestsCard;
