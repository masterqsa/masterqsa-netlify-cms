import React, { useState } from 'react'
import turboSpiral from '../img/turbo-spiral.svg'

const WORKSPACE_TABS = [
  { id: 'roc', label: 'ROC v4.0.1' },
  { id: 'saq', label: 'Standalone SAQs' },
  { id: 'turboai', label: 'TurboAI & Scope' },
]

const SAQ_VARIANTS = [
  {
    code: 'SAQ A',
    title: 'Card-Not-Present (Outsourced)',
    scope: 'Pruned to SAQ A controls only',
  },
  {
    code: 'SAQ B-IP',
    title: 'Standalone IP-Connected PTS',
    scope: 'Guided POI terminal workflow',
  },
  {
    code: 'SAQ C-VT',
    title: 'Web-Based Virtual Terminals',
    scope: 'Isolated browser terminal scope',
  },
  {
    code: 'SAQ P2PE',
    title: 'Validated P2PE Solutions',
    scope: 'Streamlined P2PE attestation',
  },
  {
    code: 'SAQ D — Merchant',
    title: 'Full Merchant Self-Assessment',
    scope: 'All applicable merchant sections',
  },
  {
    code: 'SAQ D — Service Provider',
    title: 'Service Provider Attestation',
    scope: 'Multi-tenant & TPSP reporting',
  },
]

export default function PciWorkspacePreview() {
  const [activeTab, setActiveTab] = useState('roc')

  return (
    <div className="tq-workspace-scene">
      <img
        src={turboSpiral}
        alt=""
        aria-hidden="true"
        className="tq-workspace-watermark"
      />
      <div
        className="tq-workspace"
        role="region"
        aria-label="Interactive TurboQSA workspace preview"
      >
        <div className="tq-ws-rail" aria-hidden="true">
          <div className="tq-ws-rail__logo">
            <img src={turboSpiral} alt="" />
          </div>
          <span className="tq-ws-rail__icon is-active" title="Projects">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </span>
          <span className="tq-ws-rail__icon" title="SAQ & RFT">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="13" y2="17" />
            </svg>
          </span>
          <span className="tq-ws-rail__icon" title="TurboAI">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />
            </svg>
          </span>
          <div className="tq-ws-rail__avatar">QSA</div>
        </div>

        <div className="tq-ws-main">
          <div className="tq-ws-topbar">
            <div className="tq-ws-crumb">
              <span>TurboQSA</span>
              <span>/</span>
              <span>PCI DSS v4.0.1</span>
            </div>
            <div
              className="tq-ws-tabs"
              role="tablist"
              aria-label="Workspace view selector"
            >
              {WORKSPACE_TABS.map(tab => {
                const isSelected = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    id={`tq-ws-tab-${tab.id}`}
                    aria-selected={isSelected}
                    aria-controls={`tq-ws-panel-${tab.id}`}
                    className={`tq-ws-tab ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {activeTab === 'roc' && (
            <div
              className="tq-ws-body"
              role="tabpanel"
              id="tq-ws-panel-roc"
              aria-labelledby="tq-ws-tab-roc"
            >
              <div className="tq-ws-header">
                <div>
                  <small>REPORT ON COMPLIANCE · v4.0.1 r3</small>
                  <h3>Merchant Assessment Workspace</h3>
                </div>
                <span className="tq-ws-pill tq-ws-pill--solid">
                  Export ROC + AOC (.docx)
                </span>
              </div>

              <div className="tq-ws-metrics">
                <div className="tq-ws-metric">
                  <span>Assessment Stage</span>
                  <strong>Part II</strong>
                </div>
                <div className="tq-ws-metric">
                  <span>Payment Channels</span>
                  <strong>2 Scoped</strong>
                </div>
                <div className="tq-ws-metric">
                  <span>QA Workflow</span>
                  <strong>Peer Review</strong>
                </div>
              </div>

              <div className="tq-ws-rows">
                <div className="tq-ws-row">
                  <div>
                    <b>Req 1 · Network Security Controls</b>
                    <small>Evidence &amp; Sampling Verified</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--green">
                    In Place
                  </span>
                  <span className="tq-ws-channel">All Channels</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>Req 3 · Protect Stored Account Data</b>
                    <small>PAN Masking &amp; Key Management</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--blue">
                    Peer Review
                  </span>
                  <span className="tq-ws-channel">E-Commerce</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>Req 11 · Security Testing &amp; ASV Scans</b>
                    <small>Segmentation &amp; Penetration Testing</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--amber">
                    QSA Review
                  </span>
                  <span className="tq-ws-channel">Retail POS</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>Part I &amp; II · Custom RFT Templates</b>
                    <small>Reusable applicability across engagements</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--green">
                    Ready to Export
                  </span>
                  <span className="tq-ws-channel">ROC + AOC</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'saq' && (
            <div
              className="tq-ws-body"
              role="tabpanel"
              id="tq-ws-panel-saq"
              aria-labelledby="tq-ws-tab-saq"
            >
              <div className="tq-ws-header">
                <div>
                  <small>SAQ-ONLY MODE · PRUNED CHAPTERS</small>
                  <h3>Standalone PCI DSS v4.0.1 SAQs</h3>
                </div>
                <span className="tq-ws-pill">Guided Flow</span>
              </div>

              <div className="tq-saq-grid-mini">
                {SAQ_VARIANTS.map(saq => (
                  <div key={saq.code} className="tq-saq-mini-card">
                    <strong>{saq.code}</strong>
                    <span>{saq.title}</span>
                  </div>
                ))}
              </div>

              <div className="tq-ws-export-box">
                <span>Word Deliverables &amp; RFTs</span>
                <div className="tq-ws-chips">
                  <i>Combined SAQ + AOC (.docx)</i>
                  <i>Standalone AOC (.docx)</i>
                  <i>7 Standard SAQ RFTs</i>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'turboai' && (
            <div
              className="tq-ws-body"
              role="tabpanel"
              id="tq-ws-panel-turboai"
              aria-labelledby="tq-ws-tab-turboai"
            >
              <div className="tq-ws-header">
                <div>
                  <small>HOSTED IN YOUR OWN AWS OR AZURE CLOUD · NO EXFILTRATION</small>
                  <h3>TurboAI, Scope KB &amp; API Sync</h3>
                </div>
                <span className="tq-ws-pill">Your Cloud</span>
              </div>

              <div className="tq-ws-rows">
                <div className="tq-ws-row">
                  <div>
                    <b>TurboAI Evidence Suggestions</b>
                    <small>Cites document location &amp; drafts justification</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--green">
                    QSA Approval
                  </span>
                  <span className="tq-ws-channel">Private AI</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>Client Scope Knowledge Base</b>
                    <small>Shared assets, networks &amp; third-party registers</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--blue">
                    Auto-Hydrate
                  </span>
                  <span className="tq-ws-channel">Multi-Project</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>System Integration API &amp; MCP Server</b>
                    <small>Connect CI/CD evidence &amp; internal tools</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--green">
                    API Key Auth
                  </span>
                  <span className="tq-ws-channel">REST / MCP</span>
                </div>
                <div className="tq-ws-row">
                  <div>
                    <b>Pay-As-You-Go Engagement Billing</b>
                    <small>Unlimited client users · Custom package deals</small>
                  </div>
                  <span className="tq-status-chip tq-status-chip--amber">
                    Flexible Scale
                  </span>
                  <span className="tq-ws-channel">Sales Details</span>
                </div>
              </div>
            </div>
          )}

          <div className="tq-ws-footer">
            <span>Illustrative Product Workspace</span>
            <span>PCI DSS v4.0.1 · Standalone SAQ · PCI PIN</span>
          </div>
        </div>
      </div>
    </div>
  )
}
