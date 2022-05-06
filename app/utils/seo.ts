import { initSeo } from 'remix-seo'

const title = 'Franck Boucher'
const description =
  'I am a web developer and this is my blog where I share about web development, best practices, Javascript and more'
export const { getSeo, getSeoLinks, getSeoMeta } = initSeo({
  title,
  description,
  twitter: {
    card: 'summary',
    creator: '@Franck_Boucher',
    site: 'https://fboucher.com/',
    title,
    description,
  },
})
