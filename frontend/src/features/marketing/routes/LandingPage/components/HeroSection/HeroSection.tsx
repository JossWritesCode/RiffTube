import TvIcon from '@/assets/rifftube-logo.svg?react';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <section className="bg-backstage text-white overflow-hidden">
      <div className="mx-auto max-w-lg px-4 py-8 sm:max-w-xl sm:py-12 md:max-w-screen-2xl lg:py-20 space-y-6">
        <div className="bg-flicker-white text-black rounded-2xl p-4 sm:p-8 shadow-2xl">
          {/* Logo + Wordmark */}
          <div className="flex items-baseline justify-center md:justify-start gap-2 sm:gap-4">
            <TvIcon
              className="h-8 w-auto sm:h-10 md:h-14 lg:h-20 -mt-px"
              aria-hidden="true"
            />
            <h1 className="font-['Limelight',cursive] text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-none">
              RiffTube
            </h1>
          </div>

          {/* Tagline */}
          <p className="mt-3 text-lg sm:text-xl md:text-2xl leading-snug text-center md:text-left space-y-0.5 mb-4 sm:mb-6">
            <span className="block">Your voice.</span>
            <span className="block">Your commentary.</span>
            <span className="block">Your movie night.</span>
          </p>

          {/* CTA */}
          <div className="flex justify-center md:justify-start">
            <Link
              to="/signup"
              className="rounded-md bg-primary px-4 py-2 text-base sm:px-6 sm:py-3 sm:text-lg font-semibold text-white transition hover:bg-primary-dark"
            >
              Start Riffing
            </Link>
          </div>
        </div>

        {/* Cinema Seats Strip */}
        <div className="relative overflow-hidden rounded-b-2xl shadow-2xl">
          <div className="h-32 sm:h-40 md:h-48 lg:h-64 bg-[url('/theater.png')] bg-center bg-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
