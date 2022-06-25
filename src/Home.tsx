import { Link } from "react-router-dom";
import PageHeader from "./PageHeader";

function Home() {
  return (
    <div>
      <PageHeader>Home</PageHeader>
      <div>
        <Link to="streams/new">
          New Stream
        </Link>
      </div>
    </div>
  );
}

export default Home;
