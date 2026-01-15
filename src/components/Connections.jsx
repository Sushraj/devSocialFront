import axios from "axios";
import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
      // Handle the response data as needed
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) return <h1>No Connections Found</h1>;

  return (
    <div className="min-h-screen w-full px-4 py-10 bg-base-100">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Connections</h1>
        <p className="text-sm opacity-70 mt-2">Your matches</p>
      </div>

      {/* Tinder-style cards grid */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {connections.map((connection) => {
          if (!connection?._id) return null;

          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={connection._id}
              className="relative overflow-hidden rounded-3xl shadow-xl bg-base-200 transition hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative h-[350px] w-full">
                <img
                  src={photoUrl}
                  alt="profile"
                  className="h-full w-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Connected badge */}
                <div className="absolute top-4 right-4">
                  <span className="badge badge-secondary">Connected</span>
                </div>

                {/* User info */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex justify-between items-end">
                    <h2 className="text-xl font-bold">
                      {firstName} {lastName}
                      {age && <span>, {age}</span>}
                    </h2>

                    {gender && (
                      <span className="badge badge-outline border-white text-white">
                        {gender}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm line-clamp-2 opacity-90">
                    {about || "No bio added yet."}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 flex justify-between items-center">
                <button className="btn btn-sm btn-ghost">View Profile</button>

                <button className="btn btn-sm bg-pink-500 text-white border-0 hover:bg-pink-600">
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
