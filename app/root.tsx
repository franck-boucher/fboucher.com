import { SkipNavContent, SkipNavLink } from '@reach/skip-nav'
import skipNavStyles from '@reach/skip-nav/styles.css'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'
import type { LinksFunction, LoaderFunction } from '@remix-run/server-runtime'
import { json } from '@remix-run/server-runtime'
import Nav from '~/components/nav'
import appStyles from '~/styles/app.css'
import ErrorPage from './components/error-page'
import Footer from './components/footer'
import { preloadSvg } from './components/theme-toggle'
import { preloadSocialSvgs } from './routes'
import type { Theme } from './utils/theme'
import { SsrTheme, ThemeMeta, ThemeProvider, useTheme } from './utils/theme'
import { getThemeSession } from './utils/theme-session.server'

type LoaderData = { theme: Theme | null }

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: skipNavStyles },
    { rel: 'stylesheet', href: appStyles },
    {
      rel: 'preload',
      href: '/fonts/Poppins-Regular.ttf',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
    {
      rel: 'preload',
      href: '/fonts/Poppins-Bold.ttf',
      as: 'font',
      type: 'font/ttf',
      crossOrigin: 'anonymous',
    },
    ...preloadSvg(),
    ...preloadSocialSvgs(),
  ]
}

export const loader: LoaderFunction = async ({ request }) => {
  const { getTheme } = await getThemeSession(request)

  return json<LoaderData>({ theme: getTheme() })
}

function Document({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme()
  return (
    <html lang='en' className={`h-full ${theme ? theme : 'dark'}`}>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width,initial-scale=1' />
        <ThemeMeta />
        <Meta />
        <Links />
      </head>
      <body className='h-full bg-white dark:bg-zinc-800'>
        <SkipNavLink className='bg-gray-700'>Skip to content</SkipNavLink>
        <div className='container mx-auto flex h-full max-w-4xl flex-col px-6'>
          <Nav />
          <main className='flex-1'>
            <SkipNavContent />
            {children}
          </main>
          <Footer />
        </div>
        <SsrTheme serverTheme={!!theme} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}

export default function AppProviders() {
  const { theme } = useLoaderData<LoaderData>()

  return (
    <ThemeProvider ssrTheme={theme}>
      <App />
    </ThemeProvider>
  )
}

export function CatchBoundary() {
  const caught = useCatch()
  return (
    <ThemeProvider ssrTheme={null}>
      <Document>
        <ErrorPage error={caught.status} />
      </Document>
    </ThemeProvider>
  )
}
