import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import ContactSection from './ContactSection';

const insert = vi.fn();

vi.mock('../lib', () => ({
  supabaseClient: {
    from: () => ({ insert }),
  },
}));

describe('ContactSection', () => {
  it('recovers from a rejected submission so the visitor can retry', async () => {
    const user = userEvent.setup();
    insert.mockRejectedValueOnce(new Error('Network error')).mockResolvedValueOnce({ error: null });
    render(<ContactSection />);

    await user.type(screen.getByLabelText('Full name'), 'Ada Lovelace');
    await user.type(screen.getByLabelText('Email address'), 'ada@example.com');
    await user.type(screen.getByLabelText('Tell us about your goal'), 'Please get in touch.');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('We could not send your message. Please try again.');
    expect(screen.getByRole('button', { name: 'Send message' })).toBeEnabled();

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('status')).toHaveTextContent('Message received.');
    expect(insert).toHaveBeenCalledTimes(2);
  });

  it('keeps the submit control in a distinct action region', () => {
    render(<ContactSection />);

    const submitButton = screen.getByRole('button', { name: 'Send message' });
    expect(submitButton.parentElement).toHaveClass('form-action-zone');
    expect(screen.getByText('We will use your details only to respond to this inquiry.')).toBeInTheDocument();
  });
});
