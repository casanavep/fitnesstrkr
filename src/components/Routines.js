import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";

const Routines = (props) => {
  const [returnedRoutines, setReturnedRoutines] = useState([]);
  const getRoutines = async () => {
    const resp = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/routines",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const rawRoutines = await resp.json();
    setReturnedRoutines(rawRoutines);
  };
  useEffect(() => {
    getRoutines();
  }, []);
  const addRoutines = async (e) => {
    e.preventDefault();
    return <p>add routing placeholder</p>;
  };
  return (
    <>
      {/* {props.user && (
        <div className="routineItem" key="addRouine">
          Placeholder to add a routine
        </div>
      )} */}
      <div id="routines" className="postMain">
        <div id="routinesContainer">
          {returnedRoutines.map((routine) => {
            return (
              <>
                {routine.isPublic && (
                  <div className="routineItem" key={routine.id}>
                    <h3>Routine Name: {routine.name}</h3>
                    <p>Goal: {routine.goal}</p>
                    <p>Creator: {routine.creatorName}</p>
                    <div>
                      {routine.activities.map((activity) => {
                        return (
                          <>
                            <h3>Activity</h3>
                            <h3>Name: {activity.name}</h3>
                            <p>Desc: {activity.description}</p>
                            <p>Duration: {activity.duration}</p>
                            <p>Count: {activity.count}</p>
                          </>
                        );
                      })}
                    </div>
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

export default Routines;
