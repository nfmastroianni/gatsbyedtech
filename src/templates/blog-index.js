import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { Pagination } from "../components/Pagination"

const BlogCard = ({ authors, excerpt, image, title, date, url }) => {
  return (
    <article className="rounded-md shadow-md">
      <Link
        to={`${url}`}
        className="focus:outline-none focus:ring-4 focus:ring-emerald-300 block rounded-t"
      >
        <header className="relative">
          <GatsbyImage
            className="inset-0 z-0 h-60 rounded-t-md filter grayscale"
            image={getImage(image.gatsbyImageData)}
            alt=""
          />

          <div className="font-teko text-xl md:text-3xl lg:text-4xl bg-emerald-200 bg-opacity-25 transition duration-300 ease-in-out hover:bg-opacity-0 absolute inset-0 flex items-center justify-center">
            <h1 className="text-center absolute -top-4 p-4 bg-emerald-900 bg-opacity-95 text-white rounded-md leading-none grayscale-0">
              {title.text}
            </h1>
          </div>
        </header>
      </Link>
      <div className="dark:bg-gray-800 dark:text-white p-4">
        <div className="flex justify-center flex-wrap">
          <p className="font-teko text-xl dark:text-emerald-200 ">
            Published on {date} by{" "}
          </p>
          <ul className="list-none font-teko text-xl dark:text-emerald-200 ml-1">
            {authors.map((author, i) => {
              return (
                <li
                  key={author.post_authors_author.document.id}
                  className="inline"
                >
                  {" "}
                  {author.post_authors_author.document.data.author_title.text}
                  {`${
                    authors.length > 1 && i < authors.length - 1 ? ` & ` : ``
                  }`}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="prose prose-lg dark:prose-dark mx-auto">
          <RichText render={excerpt.richText} htmlSerializer={htmlSerializer} />
        </div>
      </div>
      <footer className=" dark:bg-gray-800 dark:text-white py-8 rounded-b-md text-center">
        <Link
          to={`${url}`}
          className="font-source px-4 py-3 border-2 border-emerald-800 dark:border-emerald-400 rounded-md hover:shadow-md hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
          Read This Article
        </Link>
      </footer>
    </article>
  )
}

export default function Blog({
  path,
  pageContext: { currentPage, limit, numPages, totalPosts, basePath },
  data: {
    allPrismicPost: { nodes },
  },
}) {
  const canonical =
    currentPage === 1
      ? `https://edtechwave.com${basePath}/`
      : `https://edtechwave.com${basePath}/${currentPage}/`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title="Blog"
        locale="en-US"
        description="Check out our latest blog posts on all kinds of Educational Technology topics."
      />
      <div className="mx-auto mb-12 px-3">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-emerald-800 dark:text-emerald-100 font-teko">
            EdTech Blog
          </h1>
          {numPages > 1 ? (
            <p className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-emerald-700 dark:text-emerald-100 font-teko">
              Page {currentPage} of {numPages}
            </p>
          ) : (
            <></>
          )}
        </header>
        {numPages > 1 ? (
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath="/blog"
            />
          </div>
        ) : (
          <></>
        )}
        <ul className="list-none max-w-screen-md mx-auto">
          {nodes.map(post => {
            const {
              data: {
                post_authors,
                post_excerpt,
                post_featured_image,
                post_title,
              },
              first_publication_date,
              prismicId,
              url,
            } = post
            return (
              <li key={prismicId} className="my-8">
                <BlogCard
                  title={post_title}
                  authors={post_authors}
                  excerpt={post_excerpt}
                  image={post_featured_image}
                  date={first_publication_date}
                  url={url}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {numPages > 1 ? (
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numPages}
            basePath="/blog"
          />
        </div>
      ) : (
        <></>
      )}
    </Layout>
  )
}

export const data = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPrismicPost(
      sort: { fields: first_publication_date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        pageCount
      }
      nodes {
        url
        prismicId
        first_publication_date(formatString: "MMMM Do, YYYY")
        data {
          post_title {
            text
          }
          post_featured_image {
            gatsbyImageData(placeholder: BLURRED)
            alt
          }
          post_excerpt {
            richText
          }
          post_authors {
            post_authors_author {
              document {
                ... on PrismicAuthor {
                  id
                  data {
                    author_profile_image {
                      gatsbyImageData(placeholder: BLURRED)
                    }
                    author_title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
