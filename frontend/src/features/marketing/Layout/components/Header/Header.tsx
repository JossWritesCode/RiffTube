import { Link } from 'react-router-dom';
import TvIcon from '@/assets/rifftube-logo.svg?react';

function Header() {
  return (
    <header className="bg-backstage">
      <div className="container max-w-screen-2xl mx-auto px-4 py-4">
        <nav
          className="mx-auto w-full flex items-center justify-between"
          aria-label="Main navigation"
        >
          <Link to="/" aria-label="Home">
            <TvIcon
              className="h-8 w-auto fill-current text-white"
              aria-hidden="true"
            />
          </Link>

          <Link
            to="/login"
            className="text-lg font-semibold text-white hover:text-primary transition-colors"
          >
            Log in
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
