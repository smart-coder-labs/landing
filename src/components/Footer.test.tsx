import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './Footer';

describe('Footer', () => {
  it('renders brand proposition, legal details, and footer navigation', () => {
    render(<BrowserRouter><Footer /></BrowserRouter>);
    expect(screen.getByText('Software products, applied AI, and team capability.')).toBeInTheDocument();
    expect(screen.getByText(`© ${new Date().getFullYear()} SmartCoderLabs`)).toBeInTheDocument();
    expect(screen.getByText('All rights reserved.')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Footer navigation' })).toBeInTheDocument();
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'How we work' })).toHaveAttribute('href', '/#about');
    expect(screen.getByRole('link', { name: 'What we build' })).toHaveAttribute('href', '/#services');
    expect(screen.getByRole('link', { name: 'Insights' })).toHaveAttribute('href', '/#blog');
    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/#contact');
  });
});
