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
    <div className="min-h-screen w-full flex flex-col items-center px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Connection Requests</h1>

      <div className="w-full max-w-2xl space-y-8">
        {requests.map((request) => {
          if (!request?._id) return null;

          const { firstName, lastName, photoUrl, age, gender, about } =
            request?.fromUserId || {};

          return (
            <div
              key={request._id}
              className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl bg-base-200 shadow-2xl"
            >
              {/* Photo */}
              <div className="relative h-[420px] w-full">
                <img
                  src={photoUrl}
                  alt={`${firstName || "User"} photo`}
                  className="h-full w-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top badge */}
                <div className="absolute top-4 left-4">
                  <span className="badge badge-secondary badge-lg">
                    New Request
                  </span>
                </div>

                {/* Bottom text */}
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-end justify-between gap-3">
                    <h2 className="text-2xl font-bold leading-tight">
                      {firstName} {lastName}
                      {age ? (
                        <span className="font-semibold">, {age}</span>
                      ) : null}
                    </h2>
                    {gender ? (
                      <span className="badge badge-outline text-white border-white/60">
                        {gender}
                      </span>
                    ) : null}
                  </div>

                  {about ? (
                    <p className="mt-2 text-sm text-white/90 line-clamp-3">
                      {about}
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-white/70 italic">
                      No bio added yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-center gap-6 py-6">
                <button
                  className="btn btn-circle btn-lg bg-base-300 border-0 hover:scale-105 transition"
                  // onClick={() => handleReject(request._id)}
                  title="Reject"
                >
                  ✕
                </button>

                <button
                  className="btn btn-circle btn-lg bg-pink-500 text-white border-0 hover:bg-pink-600 hover:scale-105 transition"
                  // onClick={() => handleAccept(request._id)}
                  title="Accept"
                >
                  ❤
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
