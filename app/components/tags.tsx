import React from 'react'

type TagType = {
  children: React.ReactNode
  embedded?: boolean
}
export const Tag = ({ children, embedded = false }: TagType) => (
  <span
    className={`rounded bg-zinc-500 px-1 dark:bg-zinc-700 ${
      embedded ? 'text-sm' : 'text-base'
    }`}
  >
    {children}
  </span>
)

type TagsType = {
  tags?: string[]
  embedded?: boolean
}
export const Tags = ({ tags, embedded = false }: TagsType) => {
  if (!tags || tags.length === 0) return null
  return (
    <ul className='flex flex-wrap gap-2'>
      {tags.map(tag => (
        <li key={tag}>
          <Tag {...{ embedded }}>{tag}</Tag>
        </li>
      ))}
    </ul>
  )
}
