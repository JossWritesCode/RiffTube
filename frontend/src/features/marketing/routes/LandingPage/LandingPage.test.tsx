import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

describe('<LandingPage />', () => {
  it('renders the hero section with the main wordmark', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
    const heroHeading = screen.getByRole('heading', {
      level: 1,
      name: /rifftube/i,
    });
    expect(heroHeading).toBeInTheDocument();
  });

  it('renders the "How It Works" section', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
    const howItWorksHeading = screen.getByRole('heading', {
      level: 2,
      name: /how it works/i,
    });
    expect(howItWorksHeading).toBeInTheDocument();
  });

  it('renders the FAQ section', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );
    const faqHeading = screen.getByRole('heading', { level: 2, name: /faq/i });
    expect(faqHeading).toBeInTheDocument();
  });
});
