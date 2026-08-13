import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

afterEach(() => {
  cleanup()
  vi.useRealTimers()
})

describe('CampusConnect MVP', () => {
  it('authenticates a student and enforces role-based observability access', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Sign in as Student' }))
    expect(screen.getByRole('heading', { name: 'Student dashboard' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Observability', exact: true }))
    expect(screen.getByRole('heading', { name: 'This view requires Administrator access.' })).toBeInTheDocument()
  })

  it('supports course enrollment and event RSVP actions', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Sign in as Student' }))

    await user.click(screen.getByRole('button', { name: 'Courses', exact: true }))
    await user.click(screen.getAllByRole('button', { name: 'Add course' })[0])
    expect(screen.getByText(/Successfully enrolled in/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Events', exact: true }))
    await user.click(screen.getAllByRole('button', { name: 'RSVP' })[0])
    expect(screen.getByText(/You’re going to/)).toBeInTheDocument()
  })

  it('grounds a resume privacy answer in the FERPA policy source', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Sign in as Student' }))
    await user.click(screen.getByRole('button', { name: 'Policy AI', exact: true }))
    await user.click(screen.getByRole('button', { name: 'Can BTU share my resume?' }))

    expect(await screen.findByText('Student Records and FERPA Standard', {}, { timeout: 2000 })).toBeInTheDocument()
    expect(screen.getByText(/not released to third parties without documented consent/i)).toBeInTheDocument()
  })

  it('grants administrators access to observability and audit data', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Admin', exact: true }))
    await user.click(screen.getByRole('button', { name: 'Sign in as Administrator' }))
    await user.click(screen.getByRole('button', { name: 'Observability', exact: true }))
    expect(screen.getByRole('heading', { name: 'CampusConnect is healthy.' })).toBeInTheDocument()
    expect(screen.getByText('99.98%')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Security & FERPA', exact: true }))
    expect(screen.getByRole('heading', { name: 'Recent access audit' })).toBeInTheDocument()
    expect(screen.getByText('Blocked')).toBeInTheDocument()
  })
})
