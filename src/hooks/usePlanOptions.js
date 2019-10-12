import { graphql, useStaticQuery } from 'gatsby'

const CONTENT_QUERY = graphql`
  query PlanOptionsQuery {
    markdownRemark(frontmatter: { content_key: { eq: "plans" } }) {
      frontmatter {
        plans {
          name
          amount
          features
          color
        }
      }
    }
  }
`

export default function usePlanOptions() {
  const { markdownRemark: { frontmatter } } = useStaticQuery(CONTENT_QUERY)

  return frontmatter.plans
}
