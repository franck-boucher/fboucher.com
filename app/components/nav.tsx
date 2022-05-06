import * as React from 'react'
import NavLink from './nav-link'
import ThemeToggle, { SsrPlaceholder } from './theme-toggle'
import { ClientOnly } from './client-only'

export default function Nav() {
  return (
    <header className='pt-10 pb-16'>
      <nav className='flex items-center justify-between'>
        <NavLink to='/' size='text-2xl' className='font-semibold no-underline'>
          <h1>fboucher.com</h1>
        </NavLink>

        <div className='flex items-center gap-4'>
          {/* <NavLink prefetch='intent' to='/blog'>
            Blog
          </NavLink> */}
          <NavLink prefetch='intent' to='/about'>
            About
          </NavLink>
          {/*
           * Since the correct theme on the initial render is known at
           * the client, we'll render the theme toggle at the client
           * after hydration
           */}
          <ClientOnly fallback={<SsrPlaceholder />}>
            {() => <ThemeToggle />}
          </ClientOnly>
        </div>
      </nav>
    </header>
  )
}
