import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { SecondaryButton } from "../Button";

function List() {
  const { data: accountData } = useAccount();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          Streams
        </div>
        {accountData && (
          <Link to="new">
            <SecondaryButton>+ Create New Stream</SecondaryButton>
          </Link>
        )}
      </div>
    </div>
  );
}

export default List;
