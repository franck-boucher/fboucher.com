import type { getMdxListItems } from './utils/mdx.server'

type GitHubFile = {
  content: string
  path: string
}

type MdxPage = {
  code: string
  slug: string
  frontmatter: {
    published?: boolean
    title?: string
    description?: string
    meta?: Record<string, string | string[]> & {
      keywords?: Array<string>
    }
    date?: string
    tags?: Array<string>
    year?: number
    type?: 'pro' | 'perso'
  }
}

type MdxComponent = {
  frontmatter: MdxPage['frontmatter']
  slug: string
  title: string
  code: string
  timestamp: Date
  description?: string
}

type RawMdxListItem = Awaited<ReturnType<typeof getMdxListItems>>[0]
type MdxListItem = RawMdxListItem &
  Pick<MdxPage['frontmatter'], 'tags' | 'year' | 'type'>

export type { GitHubFile, MdxPage, MdxComponent, MdxListItem }
