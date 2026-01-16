import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { removeUserFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";

function UserCard({ user }) {
  const [firstName, lastName, photoUrl, age, gender, about, _id] = [
    user.firstName,
    user.lastName,
    user.photoUrl,
    user.age,
    user.gender,
    user.about,
    user._id,
  ];
  const dispatchEvent = useDispatch();

  const handleSendRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log("Request sent successfully:", response.data);

      dispatchEvent(removeUserFeed(_id));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={user.photoUrl} className="rounded-xl" alt="user photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p> {age + " " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-4 gap-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
