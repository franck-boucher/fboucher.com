import * as React from 'react'
import type { NavLinkProps as RemixNavLinkProps } from '@remix-run/react'
import { NavLink as RemixNavLink } from '@remix-run/react'
import clsx from 'clsx'

interface NavLinkProps extends RemixNavLinkProps {
  size?:
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl'
    | 'text-9xl'
}
export default function NavLink({
  className,
  size = 'text-xl',
  ...rest
}: NavLinkProps) {
  return (
    <RemixNavLink
      className={({ isActive }) =>
        clsx(
          `${size} text-gray-800 dark:text-gray-50`,
          isActive ? 'underline underline-offset-2' : null,
          className,
        )
      }
      {...rest}
    />
  )
}
