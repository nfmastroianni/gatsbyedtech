import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

const PrismicVideo = ({ data, path }) => {
  if (!data) return null
  const document = data.video.data
  const getVideoSrc = url => {
    let id = ""
    if (document.video_embed.provider_name === "YouTube") {
      id = url.substring(url.length - 11)
      return `https://www.${document.video_embed.provider_name}.com/embed/${id}`
    } else if (document.video_embed.provider_name === "Loom") {
      id = url.substring(url.length - 32)
      return `https://www.${document.video_embed.provider_name}.com/embed/${id}`
    } else if (document.video_embed.provider_name === "video.other") {
      return document.video_embed.embed_url
    }
  }
  const videoSrc = getVideoSrc(document.video_embed.embed_url)
  const canonical = `${data.site.siteMetadata.siteUrl}${data.video.url}`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title={document.video_title.text}
        description={document.video_description.text}
        image={
          document.video_embed.thumbnail_url
            ? document.video_embed.thumbnail_url
            : null
        }
      />
      <div className="bg-black p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            {document.video_embed.provider_name !== "video.other" && (
              <iframe
                title={document.video_title.text}
                className="mx-auto rounded-md"
                src={videoSrc}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                allowFullScreen
              ></iframe>
            )}
            {document.video_embed.provider_name === "video.other" && (
              <iframe
                src={videoSrc}
                className="mx-auto rounded-md"
                allow="autoplay"
                title={document.video_title.text}
              ></iframe>
            )}
          </div>
        </div>
      </div>
      <div className="prose dark:prose-dark prose-lg md:prose-xl mx-auto my-3 md:my-4 lg:my-6">
        <RichText
          render={document.video_description.richText}
          htmlSerializer={htmlSerializer}
        />
      </div>
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query VideoQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    video: prismicVideo(id: { eq: $id }) {
      url
      data {
        video_description {
          richText
          text
        }
        video_embed {
          embed_url
          provider_name
          thumbnail_url
        }
        video_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...VideoDataBodyText
        }
      }
    }
  }
`
export default PrismicVideo
