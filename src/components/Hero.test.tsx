import { render, screen } from '@testing-library/react';
import Hero from './Hero';
import { BrowserRouter } from 'react-router-dom';

describe('Hero component', () => {
  it('renders hero title and subtitle', () => {
    render(
      <BrowserRouter>
        <Hero />
      </BrowserRouter>
    );
    expect(screen.getByText(/SmartCoderLabs/i)).toBeInTheDocument();
    expect(screen.getByText(/Codificando el futuro con inteligencia/i)).toBeInTheDocument();
  });
});
