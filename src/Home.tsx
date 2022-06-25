import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import PageHeader from "./PageHeader";
import Button from './Button';

function CanNewStream() {
  const { data } = useAccount();

  if (!data) {
    return (
      <div>
        Connect your wallet to create a New Stream.
      </div>
    );
  }

  return (
    <div>
      <Link to="streams/new">
        <Button>
          New Stream
        </Button>
      </Link>
    </div>
  )
}

function Home() {
  return (
    <div>
      <PageHeader>Home</PageHeader>
      <CanNewStream />
    </div>
  );
}

export default Home;
