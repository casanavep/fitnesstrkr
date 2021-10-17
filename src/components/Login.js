import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    );
    const info = await response.json();
    localStorage.setItem("token", info.token);
    setUsername(username);
    props.setUser(info.user);
    props.setToken(info.token);
    history.push("/");
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        {/* <label>Username</label> */}
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          value={username}
          placeholder="username"
        />
        <br></br>
        {/* <label>Password</label> */}
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password"
        />
        <br></br>
        <button type="submit">log in</button>
      </form>
      <Link to="/register">Don't have an Account? Sign up Here</Link>
    </div>
  );
};

export default Login;
