import TwitterIcon from '@/assets/twitter.svg?react';
import FacebookIcon from '@/assets/facebook.svg?react';
import YouTubeIcon from '@/assets/youtube.svg?react';
import TVIcon from '@/assets/rifftube-logo.svg?react';

function Footer() {
  return (
    <footer className="bg-backstage py-8">
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
        <div className="flex space-x-6">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="text-white hover:text-primary"
          >
            <FacebookIcon className="h-6 w-6 fill-none stroke-current text-white stroke-2" />
          </a>
          <a
            href="https://twitter.com"
            aria-label="Twitter"
            className="text-white hover:text-primary"
          >
            <TwitterIcon className="h-6 w-6 fill-none stroke-current text-white stroke-2" />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            className="text-white hover:text-primary"
          >
            <YouTubeIcon className="h-6 w-6 fill-none stroke-current text-white stroke-2" />
          </a>
        </div>
        <div className="flex items-baseline gap-2">
          <TVIcon
            className="h-6 w-auto sm:h-8 fill-current text-white"
            aria-hidden="true"
          />
          <span className="font-['Limelight',cursive] text-lg sm:text-xl text-white">
            RiffTube
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
