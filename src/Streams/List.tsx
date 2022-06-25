import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { SecondaryButton } from "../Button";
import PageHeader from "../PageHeader";

function List() {
  const { data: accountData } = useAccount();
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageHeader>Streams</PageHeader>
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
