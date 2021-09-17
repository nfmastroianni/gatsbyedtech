import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const PrismicPage = ({ data, path }) => {
  if (!data) return null
  const document = data.page.data
  return (
    <Layout path={path}>
      <Seo title={document.page_title.text} />
      <div>
        <SliceZone sliceZone={document.body} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($id: String) {
    page: prismicPage(id: { eq: $id }) {
      _previewable
      data {
        page_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PageDataBodySectionHeading
          ...PageDataBodyText
          ...PageDataBodyFullWidthImage
          ...PageDataBodyImageHighlight
          ...PageDataBodyYoutubeHighlight
          ...PageDataBodyContentGrid
        }
      }
    }
  }
`
export default withPrismicPreview(PrismicPage, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
