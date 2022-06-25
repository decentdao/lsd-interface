import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div className="border-b pb-4 mb-4 text-2xl">Home</div>
      <div>
        <Link to="streams/new">
          New Stream
        </Link>
      </div>
    </div>
  );
}

export default Home;
