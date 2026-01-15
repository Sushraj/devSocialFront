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
    <div className="text-center  my-10 ">
      <h1 className="text-3xl font-bold">Connections</h1>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about } =
          connection;
        if (!connection._id) return null;

        return (
          <div
            className="m-4 p-4 rounded-lg shadow-md bg-base-300 flex flex-col items-center gap-2"
            key={connection._id}
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
