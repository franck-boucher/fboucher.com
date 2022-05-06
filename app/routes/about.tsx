import * as React from 'react'
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'

import styles from 'highlight.js/styles/night-owl.css'
import { getSeoMeta } from '~/utils/seo'
import { H2, H3, H4, P, Text } from '~/components/texts'
import { getMdxListItems } from '~/utils/mdx.server'
import type { MdxListItem, MdxPage } from '~/types'
import { useLoaderData } from '@remix-run/react'
import ContentList from '~/components/content-list'

import me from '~/assets/me.jpeg'

export const meta: MetaFunction = () => {
  const keywords = [
    'about',
    'fboucher.com',
    'franck',
    'boucher',
    'blog',
    'engineer',
    'developer',
  ]
  const title = 'About Franck Boucher'
  const description = 'Who am I and why this blog'
  const seoMeta = getSeoMeta({
    title,
    description,
    twitter: { description, title },
  })

  return { ...seoMeta, keywords: keywords.join(', ') }
}

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'cache-control':
      loaderHeaders.get('cache-control') ?? 'private, max-age=60',
    Vary: 'Cookie',
  }
}

type LoaderData = { projectList: MdxListItem[] }

export const loader: LoaderFunction = async () => {
  const rawMdxListItems = await getMdxListItems({
    contentDirectory: 'projects',
  })

  const projectList: MdxListItem[] = rawMdxListItems.map(item => {
    const { tags, type, year } = JSON.parse(
      item.frontmatter,
    ) as MdxPage['frontmatter']
    return {
      ...item,
      tags,
      type,
      year,
    }
  })

  return json<LoaderData>(
    { projectList },
    {
      headers: { 'cache-control': 'private, max-age=60', Vary: 'Cookie' },
    },
  )
}

export default function About() {
  const { projectList } = useLoaderData<LoaderData>()
  return (
    <div>
      <div className='flex items-center gap-10 pb-16'>
        <img className='h-36 w-36 rounded-full' src={me} alt='Franck Boucher' />
        <div>
          <H2 className='mb-1 text-3xl'>Hi, I am Franck 👋</H2>
          <P className='text-xl '>
            I am a web developer and I live in France 🇫🇷 🥖.
          </P>
        </div>
      </div>

      <H3 id='why-this-blog'>
        <a href='#why-this-blog'>Why this blog ?</a>
      </H3>
      <P>
        Throughout my years of experience and thanks to a lot of people, I have
        been accumulating a lot of knowledge. Though I am still learning, this
        blog is about me giving back what I know and believe.
      </P>
      <P>
        I also hope the exercice of exposing my knowledge is a good way to
        consolidate it 🤓.
      </P>
      <P>
        This blog is also for me a good opportunity to maintain a production
        application with multiple features and not so straightforward
        architecture.
      </P>

      <Divider />

      <H3 id='about-me'>
        <a href='#about-me'>About me</a>
      </H3>
      <P>
        I began to develop in 2010 for no particular reason but the curiosity to
        know how a software is built and find out if I could build any too.
      </P>
      <P>
        In 2014, it was pretty clear I was having too much fun building web
        pages to specialize myself in something else than web development, so I
        did. And here I am, more than ten years later, still passionate about it
        🚀.
      </P>

      <div className='mt-4 flex flex-col gap-3'>
        <Text>As a developer, here are my core values:</Text>

        <CoreValue emoji='🧠' title='Hungry for knowledge'>
          One of the reasons I love my job is because I am always learning. The
          world of web development is continuously evolving so fast, and keeping
          my self up to date with the latest trends is so much fun.
        </CoreValue>

        <CoreValue
          emoji='👌'
          title="Designing the perfect implementation for user's needs"
        >
          This goes from modeling the right data models to a well thought out UI
          and UX. And it all starts with a good understanding of what the user
          needs, which might not be what he says he wants.
        </CoreValue>

        <CoreValue emoji='😁' title='Benevolence'>
          Being friendly and working with friendly people is a requirement for
          me. I love my job, I love programming, I love going to work! I will
          always try to bring the best of myself and to inspire my team to do
          the same.
        </CoreValue>
      </div>

      <Divider />

      <H3 id='project'>
        <a href='#project'>Projects I worked on</a>
      </H3>

      <ContentList
        contentList={projectList}
        contentDirectory='projects'
        readOnly
        embedded
      />
    </div>
  )
}

type CoreValueType = {
  emoji: string
  title: string
  children: React.ReactNode
}
const CoreValue = ({ emoji, title, children }: CoreValueType) => (
  <div>
    <H4>
      <span className='mr-3'>{emoji}</span>
      {title}
    </H4>
    <P>{children}</P>
  </div>
)

const Divider = () => (
  <div className='my-12 flex justify-center'>
    <hr className='w-28 border-zinc-400 dark:border-zinc-500' />
  </div>
)
