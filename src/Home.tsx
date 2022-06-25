import { Link } from "react-router-dom";
import { SecondaryButton } from './Button';
import H1 from "./H1";
import H2 from "./H2";

function Home() {
  return (
    <div className="flex-grow flex flex-col justify-center">
      <div className="mb-6">
        <H1>Liquid Streaming Derivatives</H1>
      </div>
      <div className="mb-6">
        <H2>Unlock the potential of your vesting tokens.</H2>
      </div>
      <div>
        <Link to="streams">
          <SecondaryButton>
            {`Launch app ->`}
          </SecondaryButton>
        </Link>
      </div>
    </div>
  );
}

export default Home;
