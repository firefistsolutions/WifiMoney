import config from '../../../payload.config'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import React from 'react'

import type { Page as PageType } from '../../../payload-types'

import Blocks from '../../../components/Blocks'

// Force dynamic rendering to avoid build-time database connection
export const dynamic = 'force-dynamic'

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

