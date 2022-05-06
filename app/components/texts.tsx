import React from 'react'

type TextType = React.HTMLAttributes<HTMLElement>

const headerColors = 'text-zinc-700 dark:text-white'
const colors = 'text-zinc-700 dark:text-zinc-300'

export const H2 = ({ className = '', ...props }: TextType) => (
  <h2 className={`text-3xl ${headerColors} ${className}`} {...props} />
)

export const H3 = ({ className = '', ...props }: TextType) => (
  <h3
    className={`mt-6 pb-2 text-2xl font-bold ${headerColors} ${className}`}
    {...props}
  />
)

export const H4 = ({ className = '', ...props }: TextType) => (
  <h4 className={`mt-3 pb-1 text-lg ${headerColors} ${className}`} {...props} />
)

export const P = ({ className, ...props }: TextType) => (
  <Text className={`pb-2 ${className}`} {...props} />
)

export const Text = ({ className = '', ...props }: TextType) => (
  <p className={`${colors} ${className}`} {...props} />
)
