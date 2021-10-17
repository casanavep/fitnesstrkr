import { Link } from "react-router-dom";
import { Route, useHistory } from "react-router";
import { useEffect, useState } from "react";

const MyRoutines = (props) => {
  console.log("----------App Passed State Checks---------");
  console.log(props.token);
  console.log(props.user);
  console.log("-----------------------------------------");
  const [activityItems, setActivityItems] = useState();
  const [activityId, setActivityId] = useState();
  const [count, setCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [routineId, setRoutineId] = useState();
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setRoutineGoal] = useState();
  const [myRoutines, setMyRoutines] = useState();
  //----------------------------------Fetch Routines Function-----------------------------
  // Tracked issues:
  //   - setMyRoutines does not always set into state
  //       but adding myRoutines to the useEffect fixes,
  //       at the expense of a getRoutines loop
  //
  const getRoutines = async () => {
    console.log("Get routines invoked");
    console.log(`get routines using ${props.user.username}`);
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/users/${props.user.username}/routines`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rawRoutines = await resp.json();
    console.log(rawRoutines);
    setMyRoutines(rawRoutines);
    console.log(myRoutines);
  };
  useEffect(() => {
    getRoutines();
  }, [myRoutines]);

  //-------------------------------------Add Routine Function----------------------------------
  // Tracked issues:
  //   None at this time
  //
  const history = useHistory();
  const addRoutine = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          creatorId: props.user.id,
          name: routineName,
          goal: routineGoal,
          isPublic: true,
        }),
      }
    );
    setRoutineGoal("");
    setRoutineName("");
    getRoutines();
  };
  //----------------------------------Delete Routine Function----------------------------------
  // Tracked issues:
  //   - takes two clicks to delete
  //   - will not auto-refresh after last routine deleted
  //
  const deleteRoutine = async (routineId) => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
      }
    );
    getRoutines();
  };

  //-----------------------------------Add Activity API Call-----------------------------
  const addActivity = async (e) => {
    e.preventDefault();
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify({
          activityId: activityId,
          count: count,
          duration: duration,
        }),
      }
    );
    setCount(0);
    setDuration(0);
    getRoutines();
  };
  //-----------------------------------Make Activities Dropdown--------------------------
  const getActivities = async () => {
    const resp = await fetch(
      `http://fitnesstrac-kr.herokuapp.com/api/activities`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rawActivities = await resp.json();
    const list = rawActivities.map((activity) => {
      return <option value={activity.id}>{activity.name}</option>;
    });
    setActivityItems(list);
  };
  useEffect(() => {
    getActivities();
  }, []);

  //-----------------------------------MyRoutines Page Render----------------------------
  // Tracked issues:
  //   - Add and Delete Activity Buttons not yet deployed
  //       and/or functioning
  //   - Mapping randomly breaks, but starts working after commenting, save
  //       and uncommenting.  It's  aweird state issue that started after
  //       changing computers.
  //
  return (
    <>
      <div className="routineItem" key="addRouine">
        <>
          <form onSubmit={addRoutine}>
            <input
              onChange={(e) => setRoutineName(e.target.value)}
              type="text"
              value={routineName}
              placeholder="Routine Name"
            />
            <br></br>
            <input
              onChange={(e) => setRoutineGoal(e.target.value)}
              type="text"
              value={routineGoal}
              placeholder="Goal"
            />
            <br></br>
            <button type="submit">Add Routine</button>
          </form>
        </>
      </div>
      <div id="routines" className="postMain">
        <div id="routinesContainer">
          {myRoutines.map((routine) => {
            return (
              <>
                {routine.isPublic && (
                  <div className="routineItem" key={routine.id}>
                    <h3>Routine Name: {routine.name}</h3>
                    <p>Goal: {routine.goal}</p>
                    <p>Creator: {routine.creatorName}</p>
                    <button
                      onClick={() => {
                        setRoutineId(routine.id);
                        deleteRoutine(routineId);
                      }}
                    >
                      Delete Routine
                    </button>{" "}
                    <p>
                      ______________________________________________________
                    </p>
                    <div>
                      {routine.activities.map((activity) => {
                        return (
                          <>
                            <h4>Activity</h4> <h4>Name: {activity.name}</h4>
                            <p>Desc: {activity.description}</p>
                            <p>Duration: {activity.duration}</p>
                            <p>Count: {activity.count}</p>
                            <button
                              onClick={() => {
                                setActivityId(e.target.value);
                                deleteRoutineAct();
                              }}
                            >
                              Delete Activity
                            </button>
                            <p>
                              ______________________________________________________
                            </p>
                          </>
                        );
                      })}
                    </div>
                    Add actitity:{" "}
                    <>
                      <form onSubmit={addActivity}>
                        <select
                          onChange={(e) => {
                            // props.setRoutineId(routine.id);
                            setActivityId(e.target.value);
                            setRoutineId(routine.id);
                          }}
                        >
                          {activityItems}
                        </select>
                        <input
                          onChange={(e) => setCount(e.target.value)}
                          type="text"
                          value={count}
                          placeholder="Count"
                        />
                        <br></br>
                        <input
                          onChange={(e) => setDuration(e.target.value)}
                          type="text"
                          value={duration}
                          placeholder="Duration"
                        />
                        <br></br>
                        <button type="submit">Add Activity to Routine</button>
                      </form>
                    </>
                  </div>
                )}
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MyRoutines;
