import { graphql, useStaticQuery } from 'gatsby'

const CONTENT_QUERY = graphql`
  query PlanOptionsQuery {
    markdownRemark(frontmatter: { contentKey: { eq: "plans" } }) {
      frontmatter {
        plans {
          name
          terms
          amount
          features
          color
        }
      }
    }
  }
`

export default function usePlanOptions() {
  const {
    markdownRemark: { frontmatter },
  } = useStaticQuery(CONTENT_QUERY)

  return frontmatter.plans
}
