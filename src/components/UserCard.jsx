import React from 'react'

function UserCard({user}) {
    console.log(user);
    const [firstName, lastName, photoUrl, age, gender, about] = [
      user.firstName,
      user.lastName,
      user.photoUrl,
      user.age,
      user.gender,
      user.about,
    ];
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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    );
}

export default UserCard