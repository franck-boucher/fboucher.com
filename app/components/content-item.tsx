import { Link } from '@remix-run/react'
import React from 'react'
import type { MdxListItem } from '~/types'
import { Tags } from './tags'
import { H4 } from './texts'

type ContentItemType = MdxListItem & {
  contentDirectory?: string
  readOnly?: boolean
  embedded?: boolean
}

export default function ContentItem({
  description,
  slug,
  title,
  tags,
  year,
  contentDirectory = 'blog',
  readOnly = false,
  embedded = false,
}: ContentItemType) {
  // const Header = embedded ? H3 : H2
  return (
    <li>
      <MaybeLink {...{ contentDirectory, slug, readOnly, embedded }}>
        <Header {...{ embedded }}>
          <span>{title}</span>
          {year && (
            <small
              className={`${
                embedded ? 'text-base' : 'text-lg'
              } font-normal text-gray-700 dark:text-gray-300`}
            >
              {year}
            </small>
          )}
        </Header>

        <Tags {...{ tags, embedded }} />

        <p className='text-base text-gray-600 dark:text-gray-200'>
          {description}
        </p>

        {!readOnly && (
          <div className='text-base font-bold text-gray-800 dark:text-gray-100'>
            Read more
          </div>
        )}
      </MaybeLink>
    </li>
  )
}

type HeaderType = {
  children: React.ReactNode
  embedded?: boolean
}
const Header = ({ children, embedded = false }: HeaderType) => (
  <>
    {embedded ? (
      <H4 className='flex items-baseline gap-4 '>{children}</H4>
    ) : (
      <h2 className='flex items-baseline gap-4 text-2xl font-bold text-gray-800 dark:text-gray-50'>
        {children}
      </h2>
    )}
  </>
)

type MaybeLinkType = Pick<
  ContentItemType,
  'slug' | 'contentDirectory' | 'readOnly' | 'embedded'
> & {
  children: React.ReactNode
}
const MaybeLink = ({
  slug,
  contentDirectory = 'blog',
  readOnly = false,
  children,
  embedded,
}: MaybeLinkType) => {
  const className = embedded ? 'flex flex-col' : 'flex flex-col gap-2'
  return (
    <>
      {readOnly ? (
        <div className={className}>{children}</div>
      ) : (
        <Link
          prefetch='intent'
          to={`/${contentDirectory}/${slug}`}
          className={className}
        >
          {children}
        </Link>
      )}
    </>
  )
}
