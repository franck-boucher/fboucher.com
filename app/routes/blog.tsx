import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import { useLoaderData } from '@remix-run/react'
import ContentList from '~/components/content-list'
import { getMdxListItems } from '~/utils/mdx.server'
import { getSeo } from '~/utils/seo'

type LoaderData = { blogList: Awaited<ReturnType<typeof getMdxListItems>> }

const title = 'Blogs by Franck Boucher'
const description =
  'Check out my blogs about web development, best practices, Javascript and more'
const [seoMeta, seoLinks] = getSeo({
  title,
  description,
  twitter: { title, description },
})

export const meta: MetaFunction = () => {
  return { ...seoMeta }
}

export const links: LinksFunction = () => {
  return [...seoLinks]
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'cache-control':
      loaderHeaders.get('cache-control') ?? 'private, max-age=60',
    Vary: 'Cookie',
  }
}

export const loader: LoaderFunction = async () => {
  const blogList = await getMdxListItems({ contentDirectory: 'blog' })

  return json<LoaderData>(
    { blogList },
    {
      headers: { 'cache-control': 'private, max-age=60', Vary: 'Cookie' },
    },
  )
}

export default function Blog() {
  const { blogList } = useLoaderData<LoaderData>()

  return (
    <section>
      <ContentList contentList={blogList} />
    </section>
  )
}
