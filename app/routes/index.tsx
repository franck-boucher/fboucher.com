import * as React from 'react'
// import { useLoaderData } from '@remix-run/react'
import type {
  HeadersFunction,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
// import ContentList from '~/components/content-list'
import { getMdxListItems } from '~/utils/mdx.server'
import { getSeo } from '~/utils/seo'

import me from '~/assets/me.jpeg'

import GitHubSvg from '~/assets/icons/github.svg'
import LinkedInSvg from '~/assets/icons/linkedin.svg'
import TwitterSvg from '~/assets/icons/twitter.svg'
import ExternalLink from '~/components/external-link'

export function preloadSocialSvgs() {
  return [
    { rel: 'preload', href: GitHubSvg, as: 'image', type: 'image/svg+xml' },
    { rel: 'preload', href: LinkedInSvg, as: 'image', type: 'image/svg+xml' },
    { rel: 'preload', href: TwitterSvg, as: 'image', type: 'image/svg+xml' },
  ]
}

type LoaderData = { blogList: Awaited<ReturnType<typeof getMdxListItems>> }

const [seoMeta, seoLinks] = getSeo()

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
    { blogList: blogList.slice(0, 10) },
    { headers: { 'cache-control': 'private, max-age=60' } },
  )
}

export default function Index() {
  // const { blogList } = useLoaderData<LoaderData>()

  return (
    <div className='flex flex-col gap-10'>
      <section>
        <div className='my-20 flex flex-col items-center gap-4 md:mt-36'>
          <img
            className='h-36 w-36 rounded-full'
            src={me}
            alt='Franck Boucher'
          />

          <h2 className='text-center text-5xl text-gray-800 dark:text-gray-100'>
            Franck Boucher
          </h2>

          <h2 className='text-lg text-gray-800 dark:text-gray-100'>
            Full Stack Engineer @{' '}
            <ExternalLink href='https://www.fulll.fr/' underline>
              Fulll
            </ExternalLink>
          </h2>

          <ul className='flex items-center justify-center gap-6'>
            <li>
              <ExternalLink href='https://github.com/franck-boucher'>
                <Svg>
                  <use href={`${GitHubSvg}#icon-github`} />
                </Svg>
                <span className='sr-only'>GitHub</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href='https://www.linkedin.com/in/franck-boucher/'>
                <Svg>
                  <use href={`${LinkedInSvg}#icon-linkedin`} />
                </Svg>
                <span className='sr-only'>LinkedIn</span>
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href='https://twitter.com/Franck_Boucher'>
                <Svg>
                  <use href={`${TwitterSvg}#icon-twitter`} />
                </Svg>
                <span className='sr-only'>Twitter</span>
              </ExternalLink>
            </li>
          </ul>
        </div>
      </section>

      {/* <section>
        <h2 className='text-xl text-gray-800 dark:text-gray-100'>
          Recent Posts
        </h2>
        <ContentList contentList={blogList} />
      </section> */}
    </div>
  )
}

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-7 w-7 text-gray-800 dark:text-gray-100'
    >
      {children}
    </svg>
  )
}
