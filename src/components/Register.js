import { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPass) {
      setErrorMessage("Passwords Do Not Match");
      setPassword("");
      setConfirmPass("");
    }
    const response = await fetch(
      "http://fitnesstrac-kr.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }
    );
    const regAccount = await response.json();
    console.log(regAccount);
    if (regAccount.error) {
      setErrors(regAccount.message);
      return errors;
    }
    localStorage.setItem("token", regAccount.token);
    props.setToken(regAccount.token);
    //programatic redirect
    history.push("/");
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="registration">
          <h1>New User Registration</h1>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
            minLength={4}
            placeholder="username"
            required
          />
          <br></br>

          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
            minLength={8}
            placeholder="password"
            data-for="PasswordLength"
            title="Set Six-Digit or Greater Password"
            required
          />

          <br></br>
          <input
            onChange={(e) => setConfirmPass(e.target.value)}
            type="password"
            value={confirmPass}
            minLength={8}
            placeholder="confirm password"
            required
          />
          <br></br>
          <button type="submit">register</button>
          <p>{errorMessage}</p>
        </div>
      </form>
    </>
  );
};

export default Register;
