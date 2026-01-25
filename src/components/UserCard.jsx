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
        { withCredentials: true },
      );
      console.log("Request sent successfully:", response.data);

      dispatchEvent(removeUserFeed(_id));
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-base-200 shadow-2xl">
      {/* Photo section */}
      <div className="relative h-[480px] w-full">
        <img
          src={user.photoUrl}
          alt="user photo"
          className="h-full w-full object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

        {/* Top badge (optional) */}
        <div className="absolute top-4 left-4">
          <span className="badge badge-secondary badge-lg">Nearby</span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <h2 className="text-3xl font-bold leading-tight">
            {firstName} {lastName}
          </h2>

          {age && gender ? (
            <div className="mt-1 flex items-center gap-2">
              <span className="badge badge-outline text-white border-white/60">
                {age}
              </span>
              <span className="badge badge-outline text-white border-white/60">
                {gender}
              </span>
            </div>
          ) : null}

          <p className="mt-3 text-sm text-white/90 line-clamp-3">
            {about || "No bio added yet."}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-8 py-6">
        <button
          className="btn btn-circle btn-lg bg-base-300 border-0 hover:scale-105 transition"
          onClick={() => handleSendRequest("ignored", _id)}
          title="Ignore"
        >
          ✕
        </button>

        <button
          className="btn btn-circle btn-lg bg-pink-500 text-white border-0 hover:bg-pink-600 hover:scale-105 transition"
          onClick={() => handleSendRequest("interested", _id)}
          title="Interested"
        >
          ❤
        </button>
      </div>
    </div>
  );
}

export default UserCard;
