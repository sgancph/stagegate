import type { AuthoringData } from '../../lib/types';

export const AUTHORING: AuthoringData = {
  files: [
    { name: 'Concept Design Report - Exterior', meta: 'PDF · 6.2 MB' },
    { name: 'Design Strategy - Interior', meta: 'PDF · 4.8 MB' },
    { name: 'Business Plan', meta: 'PDF · 3.1 MB' },
    { name: 'Financial Model', meta: 'XLSX · 2.0 MB' },
    { name: 'Cost Plan', meta: 'XLSX · 1.2 MB' },
    { name: 'Development Program', meta: 'PDF · 2.6 MB' },
    { name: 'Sales & Leasing Strategy', meta: 'DOCX · 1.4 MB' },
    { name: 'Marketing Strategy', meta: 'DOCX · 1.1 MB' },
  ],
  sections: [
    '1 · Strategic Case',
    '2 · Scope & Design',
    '3 · Commercial & Financial Case',
    '4 · Delivery & Procurement',
    '5 · Risk & Assurance',
    '6 · Operational Readiness',
  ],
  sectionBodies: [
    {
      section: 2,
      body: [
        {
          text: 'Detailed design is complete across all disciplines. The exterior concept has been value-engineered against the approved ',
        },
        { text: 'Cost Plan', strong: true },
        { text: ', with a 6% saving reallocated to operational readiness scope.' },
      ],
    },
    {
      section: 3,
      body: [
        { text: 'The Arena delivers a projected ' },
        { text: 'IRR of 12.4%', strong: true },
        { text: ' against a total development cost of ' },
        { text: 'SAR 1.84bn', strong: true },
        {
          text: '. Phase 1 contingency is set at 8% of construction value, consistent with the approved Cost Plan. Revenue is underpinned by a blended events calendar and anchor-tenant commitments covering 64% of leasable area.',
        },
      ],
    },
    {
      section: 4,
      body: [
        {
          text: 'Procurement moves to a two-stage design-and-build with early contractor involvement. The recommended main works contractor shortlist is evidenced in the ',
        },
        { text: 'Consultant Procurement Strategy', strong: true },
        { text: '.' },
      ],
    },
  ],
};
