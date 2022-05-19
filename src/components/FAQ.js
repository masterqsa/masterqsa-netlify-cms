import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@reach/accordion'
import '@reach/accordion/styles.css'
import { graphql, useStaticQuery } from 'gatsby'
import { HTMLContent } from './Content'

const CONTENT_QUERY = graphql`
  query FAQQuery {
    allContentfulFaqEntry(sort: { fields: createdAt, order: ASC }) {
      edges {
        node {
          id
          question
          answer {
            raw
          }
        }
      }
    }
  }
`

export default function FAQ() {
  const { allContentfulFaqEntry } = useStaticQuery(CONTENT_QUERY)
  const [currentIndices, setCurrentIndices] = React.useState([])

  const updateCurrentIndices = index => {
    setCurrentIndices(prevIndices => {
      const nextIndicesSet = new Set(prevIndices)
      if (nextIndicesSet.has(index)) {
        nextIndicesSet.delete(index)
      } else {
        nextIndicesSet.add(index)
      }
      return [...nextIndicesSet]
    })
  }

  return (
    <Accordion
      className="faqAccordion"
      index={currentIndices}
      onChange={updateCurrentIndices}
    >
      {allContentfulFaqEntry.edges.map(({ node }, idx) => {
        return (
          <AccordionItem key={node.id} className="faqAccordion__item">
            <h3
              className={[
                `is-size-5`,
                `is-size-6-mobile`,
                `has-text-weight-semibold`,
              ].join(' ')}
            >
              <AccordionButton>
                {node.question}
                <span
                  className="icon"
                  style={{
                    display: currentIndices.includes(idx) ? 'inline' : 'none',
                  }}
                >
                  <i className="fas fa-chevron-up" />
                </span>
                <span
                  className="icon"
                  style={{
                    display: currentIndices.includes(idx) ? 'none' : 'inline',
                  }}
                >
                  <i className="fas fa-chevron-down" />
                </span>
              </AccordionButton>
            </h3>
            <AccordionPanel className="faqAccordion__panel">
              <HTMLContent content={node.answer} />
            </AccordionPanel>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
