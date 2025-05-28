import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

describe('<Layout />', () => {
  it('renders the Header component in a banner landmark', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Child</div>
        </Layout>
      </MemoryRouter>,
    );
    const banner = screen.getByRole('banner');
    expect(banner).toBeInTheDocument();
  });

  it('renders the Footer component in a contentinfo landmark', () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Child</div>
        </Layout>
      </MemoryRouter>,
    );
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders its children inside the main region', () => {
    render(
      <MemoryRouter>
        <Layout>
          <p>Test child content</p>
        </Layout>
      </MemoryRouter>,
    );
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(screen.getByText('Test child content')).toBeInTheDocument();
  });
});
