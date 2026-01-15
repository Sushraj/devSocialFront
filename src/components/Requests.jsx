import axios from "axios";
import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/request";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
      // Handle the response data as needed
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;
  if (requests.length === 0) return <h1>No Request Found</h1>;

  return (
    <div>
      <div className="text-center  my-10 ">
        <h1 className="text-3xl font-bold">Connection Request</h1>
        {requests.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId;
          if (!request._id) return null;

          return (
            <div
              className="m-4 p-4 rounded-lg shadow-md bg-base-300 flex flex-col items-center gap-2"
              key={request._id}
            >
              <div>
                {" "}
                <img
                  src={photoUrl}
                  className="w-20 h-20 rounded-full"
                  alt="user photo"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">
                  {firstName} {lastName}, {age}
                </h2>
                <p className="italic">{gender}</p>
                <p>{about}</p>
              </div>
              <div className="flex gap-4">
                <button className="btn btn-primary">Reject</button>
                <button className="btn btn-secondary">Accept</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
