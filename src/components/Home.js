const Home = (props) => {
  // Log a user in if a valid token exists.
  //
  return <>{props.user && <p>Welcome {props.user.username}!</p>}</>;
};

export default Home;
