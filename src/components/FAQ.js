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
        const isExpanded = currentIndices.includes(idx)
        return (
          <AccordionItem key={node.id} className="faqAccordion__item">
            <h3>
              <AccordionButton>
                <span>{node.question}</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.16s ease',
                    color: 'var(--tq-green)',
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
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
