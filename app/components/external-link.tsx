export default function ExternalLink({
  children,
  href,
  underline = false,
}: {
  children: React.ReactNode
  href: string
  underline?: boolean
}) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={underline ? 'underline underline-offset-2' : undefined}
    >
      {children}
    </a>
  )
}
