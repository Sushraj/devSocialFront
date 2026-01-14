import React, { use } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async () => {
    setErrorMessage("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setErrorMessage(
        err?.response?.data || "Failed to save profile. Please try again."
      );
    }
  };
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center gap-10">
          <div className="card bg-base-300 w-96 shadow-sm ">
            <div className="card-body">
              <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                <legend className="fieldset-legend">Edit Profile</legend>

                <label className="label">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  className="input"
                  onChange={(e) => setFirstName(e.target.value)}
                />

                <label className="label">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  className="input"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="label">Photo Url</label>
                <input
                  type="text"
                  value={photoUrl}
                  className="input"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label className="label">Age</label>
                <input
                  type="text"
                  value={age}
                  className="input"
                  onChange={(e) => setAge(e.target.value)}
                />
                <label className="label">Gender</label>
                <select
                  value={gender}
                  className="select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                  <option value="other">other</option>
                </select>
                <label className="label">About</label>
                   <textarea
                    value={about}
                    className="textarea"
                    onChange={(e) => setAbout(e.target.value)}
                />

                <p className="text-red-500">{errorMessage}</p>
                <button
                  type="submit"
                  className="btn btn-neutral mt-4"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </fieldset>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        ></UserCard>
      </div>

      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
