import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import { SecondaryButton } from "../Button";
import PageHeader from "../PageHeader";

import StreamN1 from "../images/streamN1.png";
import StreamN1Open from "../images/streamN1open.png";
import StreamN2 from "../images/streamN2.png";
import StreamN3 from "../images/streamN3.png";

export enum N1State {
  Hidden,
  Closed,
  Open,
}

function N1Comp({
  state,
  setState,
}: {
  state: N1State,
  setState: React.Dispatch<React.SetStateAction<N1State>>,
}) {
  if (state === N1State.Closed) {
    return (
      <div className="mb-6" onClick={() => setState(N1State.Open)}>
        <img src={StreamN1} alt="n1" />
      </div>
    );
  }

  if (state === N1State.Open) {
    return (
      <div className="mb-6" onClick={() => setState(N1State.Closed)}>
        <img src={StreamN1Open} alt="n1open" />
      </div>
    );
  }

  return null;
}

function List() {
  const { data: accountData } = useAccount();

  const [n1, setN1] = useState(N1State.Hidden);

  const location = useLocation();
  const state = location.state as { showN1?: boolean } | null;

  useEffect(() => {
    if (state?.showN1 === true) {
      setN1(N1State.Closed);
    }
  }, [state?.showN1]);

  return (
    <div>
      <div className="flex justify-between items-center mb-12">
        <PageHeader>Streams</PageHeader>
        {accountData && (
          <Link to="new" state={{ setN1 }}>
            <SecondaryButton>+ Create New Stream</SecondaryButton>
          </Link>
        )}
      </div>
      <div>
        <N1Comp state={n1} setState={setN1} />
        <div className="mb-6">
          <img src={StreamN2} alt="n2" />
        </div>
        <div className="mb-6">
          <img src={StreamN3} alt="n3" />
        </div>
      </div>
    </div>
  );
}

export default List;
