import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div>Home</div>
      <div>
        <Link to="streams/new">
          New Stream
        </Link>
      </div>
    </div>
  );
}

export default Home;
