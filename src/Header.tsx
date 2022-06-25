import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return (
    <div className="mb-4 py-4 border-b flex justify-between items-start">
      <div className="text-4xl">Liquid Streaming Derivatives</div>
      <ConnectButton />
    </div>
  );
}

export default Header;
