import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer component', () => {
  it('renders copyright information', () => {
    const year = new Date().getFullYear();
    render(<Footer />);
    expect(screen.getByText(`© ${year} SmartCoderLabs. Todos los derechos reservados.`)).toBeInTheDocument();
  });
});
