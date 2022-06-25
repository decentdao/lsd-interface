import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="mb-4 border-b">
      <div className="container">
        <div className="py-4 flex justify-between items-start">
          <div className="text-4xl">
            <Link to="/">
              🫠 Liquid Streaming Derivatives
            </Link>
          </div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}

export default Header;
