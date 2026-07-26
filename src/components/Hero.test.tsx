import { render, screen } from '@testing-library/react';
import Hero from './Hero';

describe('Hero', () => {
  it('presents the primary calls to action and editorial product signals without a graph illustration', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { name: /design, build, and operate the tools/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /build with us/i })).toHaveAttribute('href', '#contact');
    expect(screen.getByText(/products are operated, not just delivered/i)).toBeInTheDocument();
    expect(screen.getByText(/capability grows with the people using it/i)).toBeInTheDocument();
    expect(document.querySelector('.graph-art')).not.toBeInTheDocument();
  });
});
