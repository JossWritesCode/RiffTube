import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HeroSection from './HeroSection';

describe('<HeroSection />', () => {
  it('renders the main heading with the RiffTube wordmark', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { name: /rifftube/i });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
  });

  it('renders all three tagline lines', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );
    ['Your voice.', 'Your commentary.', 'Your movie night.'].forEach(text => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  it('renders the signup call-to-action link', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );
    const signupLink = screen.getByRole('link', { name: /start riffing/i });
    expect(signupLink).toBeInTheDocument();
    expect(signupLink).toHaveAttribute('href', '/signup');
  });

  it('hides the TV icon from screen readers', () => {
    render(
      <MemoryRouter>
        <HeroSection />
      </MemoryRouter>,
    );
    // the TVIcon is the only SVG in the component
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });
});
