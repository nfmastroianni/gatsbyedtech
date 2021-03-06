import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export const ImageHighlight = ({ slice }) => {
  // destructure the slice object
  const {
    primary: {
      image_highlight_heading,
      image_highlight_description,
      image_highlight_image,
      image_highlight_position,
      image_highlight_link,
      image_highlight_link_text,
    },
  } = slice
  if (image_highlight_position) {
    // returns if Position of Image on 2 Col Layout is set to Right
    return (
      <section className="bg-gray-100 dark:bg-gray-700 w-full">
        {/* Grid Div */}
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
          {/* Left Side Prose Div */}
          <div className="mb-3 md:mb-4 lg:mb-6 p-3 md:p-4 lg:p-6 w-full dark:text-white">
            {/* Heading */}
            <h2 className="text-center md:text-left  text-3xl md:text-4xl text-emerald-800 dark:text-emerald-200">
              {RichText.asText(image_highlight_heading.richText)}
            </h2>
            {/* END HEADING DIV */}
            <div className="h-1 my-3 rounded bg-gradient-to-r from-transparent via-emerald-800 to-transparent dark:from-transparent dark:via-emerald-400 dark:to-transparent" />
            {/* Image Description */}
            <div className="prose md:prose-xl lg:prose-2xl prose-emerald dark:prose-dark mb-3 md:mb-4 lg:mb-6">
              <RichText
                render={image_highlight_description.richText}
                htmlSerializer={htmlSerializer}
              />
            </div>
            {/* END IMAGE DESCRIPTION */}
            {/* !# Conditionally Render Link if URL provided */}

            {image_highlight_link.url ? (
              <p className=" text-center md:text-left">
                {/* Check if Link is Web */}
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-md md:text-lg lg:text-xl  hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 border-2 border-emerald-800 dark:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    style={{ textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text
                      ? image_highlight_link_text.text
                      : RichText.asText(image_highlight_heading.richText)}
                  </a>
                ) : (
                  // If Link is NOT "Web" then it is to Prismic Document -> Render a Gatsby Link
                  <Link
                    to={image_highlight_link.url}
                    className="px-6 py-2 rounded-md md:text-lg lg:text-xl  hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 border-2 border-emerald-800 dark:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  >
                    {image_highlight_link_text.text
                      ? image_highlight_link_text.text
                      : RichText.asText(image_highlight_heading.richText)}
                  </Link>
                )}
              </p>
            ) : (
              // If no URL is  provided, render empty fragment
              <></>
            )}
          </div>
          {/* END PROSE DIV (LEFT SIDE) */}
          {/* Right Side Image Div */}
          <div className="p-3 md:p-4 lg:p-6 w-full text-left">
            {/* Render Linked Image using Anchor tag if link_type is "Web" */}
            {image_highlight_link.url &&
              image_highlight_link.link_type === "Web" && (
                <a href={image_highlight_link.url}>
                  <GatsbyImage
                    image={getImage(image_highlight_image.gatsbyImageData)}
                    alt={image_highlight_image.alt || "decorative image"}
                    imgClassName="aspect-w-16 aspect-h-9"
                    className=" rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150  transform hover:scale-105"
                  />
                </a>
              )}
            {/* Render Linked Image using Gatsby Link if link_type is "Document" */}
            {image_highlight_link.url &&
              image_highlight_link.link_type === "Document" && (
                <Link to={image_highlight_link.url}>
                  <GatsbyImage
                    image={getImage(image_highlight_image.gatsbyImageData)}
                    alt={image_highlight_image.alt || "decorative image"}
                    imgClassName="aspect-w-16 aspect-h-9"
                    className=" rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150  transform hover:scale-105"
                  />
                </Link>
              )}
            {/* If no URL/Link is provided, just render an image without the link */}
            {!image_highlight_link.url && (
              <GatsbyImage
                image={getImage(image_highlight_image.gatsbyImageData)}
                alt={image_highlight_image.alt || "decorative image"}
                imgClassName="aspect-w-16 aspect-h-9"
                className=" rounded-sm"
              />
            )}
          </div>
          {/* END RIGHT SIDE IMAGE DIV*/}
        </div>
        {/* END GRID DIV */}
      </section>
    )
  } else {
    // returns if Position of Image on 2 Col Layout is set to Left
    return (
      <section className="bg-gray-50 dark:bg-gray-800 w-full">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 justify-items-center items-center">
          {/* Left Side Image Div */}
          <div className="p-3 md:p-4 lg:p-6 w-full text-center">
            {/* Render Linked Image using Anchor tag if link_type is "Web" */}
            {image_highlight_link.url &&
              image_highlight_link.link_type === "Web" && (
                <a href={image_highlight_link.url}>
                  <GatsbyImage
                    image={getImage(image_highlight_image.gatsbyImageData)}
                    alt={image_highlight_image.alt || "decorative image"}
                    imgClassName="aspect-w-16 aspect-h-9"
                    className=" rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150  transform hover:scale-105"
                  />
                </a>
              )}
            {/* Render Linked Image using Gatsby Link if link_type is "Document" */}
            {image_highlight_link.url &&
              image_highlight_link.link_type === "Document" && (
                <Link to={image_highlight_link.url}>
                  <GatsbyImage
                    image={getImage(image_highlight_image.gatsbyImageData)}
                    alt={image_highlight_image.alt || "decorative image"}
                    imgClassName="aspect-w-16 aspect-h-9"
                    className=" rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150  transform hover:scale-105"
                  />
                </Link>
              )}
            {/* If no URL/Link is provided, just render an image without the link */}
            {!image_highlight_link.url && (
              <GatsbyImage
                image={getImage(image_highlight_image.gatsbyImageData)}
                alt={image_highlight_image.alt || "decorative image"}
                imgClassName="aspect-w-16 aspect-h-9"
                className=" rounded-sm"
              />
            )}
          </div>
          {/* END LEFT SIDE IMAGE DIV*/}
          {/* Right Side Prose Div */}
          <div className="mb-3 md:mb-4 lg:mb-6 p-3 md:p-4 lg:p-6 w-full dark:text-white">
            {/* Heading */}
            <h2 className="text-center md:text-left  text-3xl md:text-4xl text-emerald-800 dark:text-emerald-200">
              {RichText.asText(image_highlight_heading.richText)}
            </h2>
            {/* END HEADING DIV */}
            <div className="h-1 my-3 rounded bg-gradient-to-r from-transparent via-emerald-800 to-transparent dark:from-transparent dark:via-emerald-400 dark:to-transparent" />
            {/* Image Description */}
            <div className="prose md:prose-xl lg:prose-2xl prose-emerald dark:prose-dark mb-3 md:mb-4 lg:mb-6">
              <RichText
                render={image_highlight_description.richText}
                htmlSerializer={htmlSerializer}
              />
            </div>
            {/* END IMAGE DESCRIPTION */}
            {/* !# Conditionally Render Link if URL provided */}
            {image_highlight_link.url !== null && image_highlight_link_text ? (
              <p className=" text-center md:text-left">
                {/* Check if Link is Web */}
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-md md:text-lg lg:text-xl  hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 border-2 border-emerald-800 dark:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                    style={{ textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text
                      ? image_highlight_link_text.text
                      : RichText.asText(image_highlight_heading.richText)}
                  </a>
                ) : (
                  // If Link is NOT "Web" then it is to Prismic Document -> Render a Gatsby Link
                  <Link
                    to={image_highlight_link.url}
                    className="px-6 py-2 rounded-md md:text-lg lg:text-xl  hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 border-2 border-emerald-800 dark:border-emerald-400 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  >
                    {image_highlight_link_text.text
                      ? image_highlight_link_text.text
                      : RichText.asText(image_highlight_heading.richText)}
                  </Link>
                )}
              </p>
            ) : (
              // If no URL is  provided, render empty fragment
              <></>
            )}
          </div>
          {/* END PROSE DIV (RIGHT SIDE) */}
        </div>
      </section>
    )
  }
}

export const query = graphql`
  fragment HomepageDataBodyImageHighlight on PrismicHomepageDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        richText
      }
      image_highlight_description {
        richText
      }
      image_highlight_link {
        url
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
    }
  }

  fragment PageDataBodyImageHighlight on PrismicPageDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        richText
      }
      image_highlight_description {
        richText
      }
      image_highlight_link {
        url
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
    }
  }

  fragment PostDataBodyImageHighlight on PrismicPostDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        richText
      }
      image_highlight_description {
        richText
      }
      image_highlight_link {
        url
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
    }
  }
  fragment ToolDataBodyImageHighlight on PrismicToolDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        richText
      }
      image_highlight_description {
        richText
      }
      image_highlight_link {
        url
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
    }
  }
  fragment ChallengeDataBodyImageHighlight on PrismicChallengeDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        richText
      }
      image_highlight_description {
        richText
      }
      image_highlight_link {
        url
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
    }
  }
`
