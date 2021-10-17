import { useEffect, useState } from "react";

const Activities = (props) => {
  const [returnedActivities, setReturnedActivities] = useState([]);
  const [activityName, setActivityName] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const addActivity = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          name: activityName,
          description: activityDesc,
        }),
      }
    );
    setActivityName("");
    setActivityDesc("");
    getActivities();
  };

  const getActivities = async () => {
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/activities",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rawActivities = await resp.json();
    setReturnedActivities(rawActivities);
  };
  useEffect(() => {
    getActivities();
  }, []);

  return (
    <>
      <>
        {props.user && (
          <div className="routineItem" key="addActivity">
            <form onSubmit={addActivity}>
              {/* <label>Username</label> */}
              <input
                onChange={(e) => setActivityName(e.target.value)}
                type="text"
                value={activityName}
                placeholder="Activity Name"
              />
              <br></br>
              {/* <label>Password</label> */}
              <input
                onChange={(e) => setActivityDesc(e.target.value)}
                type="text"
                value={activityDesc}
                placeholder="Activity Description"
              />
              <br></br>
              <button type="submit">Add Activity</button>
            </form>
          </div>
        )}
      </>

      <div id="routines" className="postMain">
        <div id="routinesContainer">
          {returnedActivities.map((activity) => {
            return (
              <div className="routineItem" key={activity.id}>
                <>
                  <h3>Activity Name: {activity.name}</h3>
                  <p>Desc: {activity.description}</p>
                </>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Activities;
