import config from '../../../payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import type { Page as PageType } from '../../../payload-types'

import Blocks from '../../../components/Blocks'

interface PageParams {
  params: Promise<{
    slug?: string
  }>
}

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = 'home' } = await paramsPromise
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1,
    overrideAccess: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const page = pageRes?.docs?.[0] as null | undefined | PageType

  if (!page || page === null || page === undefined) {
    return notFound()
  }

  return (
    <React.Fragment>
      <Blocks blocks={page.layout || []} />
    </React.Fragment>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })
    const pagesRes = await payload.find({
      collection: 'pages',
      draft: false,
      limit: 100,
      overrideAccess: false,
    })

    const pages = pagesRes?.docs

    return pages.map(({ slug }) =>
      slug !== 'home'
        ? {
            slug,
          }
        : {},
    )
  } catch (error) {
    // If database connection fails during build, return empty array
    // Pages will be generated on-demand
    console.warn('Failed to generate static params, pages will be generated on-demand:', error)
    return []
  }
}
