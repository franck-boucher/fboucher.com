import type { MdxListItem } from '~/types'
import ContentItem from './content-item'

interface ContentListProps {
  contentList: MdxListItem[]
  contentDirectory?: string
  readOnly?: boolean
  embedded?: boolean
}
export default function ContentList({
  contentList,
  contentDirectory = 'blog',
  readOnly = false,
  embedded = false,
}: ContentListProps) {
  return (
    <ol className={`flex flex-col ${embedded ? 'gap-5' : 'gap-12'}`}>
      {contentList.map(contentItem => (
        <ContentItem
          key={contentItem.slug}
          {...{ contentDirectory, readOnly, embedded }}
          {...contentItem}
        />
      ))}
    </ol>
  )
}
