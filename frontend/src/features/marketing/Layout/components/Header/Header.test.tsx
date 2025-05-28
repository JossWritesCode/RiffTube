import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

describe('<Header />', () => {
  const renderHeader = () => {
    return render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
  };

  it('renders a header element with the expected container structure', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    const container = header.querySelector('.container');
    expect(container).toBeInTheDocument();
  });

  it('renders a home link (TV icon) pointing to "/"', () => {
    renderHeader();
    // Grab all links and find the one whose href equals '/'
    const links = screen.getAllByRole('link');
    const homeLink = links.find(link => link.getAttribute('href') === '/');
    expect(homeLink).toBeInTheDocument();
    // It should contain an <svg> (the TV icon)
    const svg = homeLink!.querySelector('svg');
    expect(svg).toBeInTheDocument();
    // Check that aria-hidden is set appropriately on the svg
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a "Log in" link pointing to "/login"', () => {
    renderHeader();
    const loginLink = screen.getByRole('link', { name: /log in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('renders a nav', () => {
    renderHeader();

    const nav = screen.queryByRole('navigation');

    expect(nav).toBeInTheDocument();
  });
});
