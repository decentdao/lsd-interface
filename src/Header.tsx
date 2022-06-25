import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';
import H1 from './H1';

function Header() {
  return (
    <div className="mb-4 py-4 flex justify-between items-start">
      <H1>
        <Link to="/streams">
          🫠 LSD
        </Link>
      </H1>
      <ConnectButton />
    </div>
  );
}

export default Header;
