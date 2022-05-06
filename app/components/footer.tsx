import * as React from 'react'
import ExternalLink from './external-link'

import LinkOrAnchor from './link-or-anchor'

export default function Footer() {
  return (
    <footer className='flex items-center justify-center pb-10 pt-16 text-gray-600 dark:text-gray-200'>
      <ul className='flex items-center gap-3'>
        <li className='text-sm'>
          © 2022 <Link href='/'>fboucher.com</Link>
        </li>
        <li>
          <Dot />
        </li>
        <li className='text-sm'>
          Powered by{' '}
          <ExternalLink href='https://remix.run/' underline>
            Remix
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href='https://fly.io/' underline>
            Fly.io
          </ExternalLink>
        </li>
      </ul>
    </footer>
  )
}

function Dot() {
  return <span>·</span>
}

function Link({
  children,
  href,
  reload,
}: {
  children: React.ReactNode
  href: string
  reload?: boolean
}) {
  return (
    <LinkOrAnchor
      href={href}
      reloadDocument={reload}
      className='inline underline underline-offset-2'
      prefetch={!href.includes(':') ? 'intent' : 'none'}
    >
      {children}
    </LinkOrAnchor>
  )
}
