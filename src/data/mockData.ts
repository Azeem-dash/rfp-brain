// ═══════════════════════════════════════════════════════════════════════════
// RFP BRAIN - Mock Data
// Realistic data for demo purposes, simulating actual Bid Manager workflows
// ═══════════════════════════════════════════════════════════════════════════

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx';
  uploadedAt: string;
  size: string;
  status: 'indexed' | 'processing' | 'error';
  qaPairsCount: number;
  isWinner: boolean;
  winRate?: number;
  lastUsed?: string;
  client?: string;
  sector?: string;
}

export interface RFPQuestion {
  id: string;
  number: number;
  category: string;
  question: string;
}

export interface GeneratedAnswer {
  questionId: string;
  answer: string;
  confidence: 'high' | 'medium' | 'low';
  confidenceScore: number;
  sourceDocument: string;
  sourcePage: number;
  sourceSnippet: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Past Proposal Documents (The "Brain")
// ─────────────────────────────────────────────────────────────────────────────
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'NHS_Digital_Infrastructure_Win_2024.pdf',
    type: 'pdf',
    uploadedAt: '2024-11-15',
    size: '4.2 MB',
    status: 'indexed',
    qaPairsCount: 47,
    isWinner: true,
    winRate: 100,
    lastUsed: '3 days ago',
    client: 'NHS England',
    sector: 'Healthcare'
  },
  {
    id: 'doc-2',
    name: 'City_Council_IT_Services_Tender_2024.docx',
    type: 'docx',
    uploadedAt: '2024-10-22',
    size: '2.8 MB',
    status: 'indexed',
    qaPairsCount: 38,
    isWinner: true,
    winRate: 100,
    lastUsed: '1 week ago',
    client: 'Manchester City Council',
    sector: 'Government'
  },
  {
    id: 'doc-3',
    name: 'TechCorp_Cybersecurity_Proposal.pdf',
    type: 'pdf',
    uploadedAt: '2024-09-08',
    size: '3.1 MB',
    status: 'indexed',
    qaPairsCount: 52,
    isWinner: true,
    winRate: 100,
    lastUsed: '2 weeks ago',
    client: 'TechCorp Industries',
    sector: 'Technology'
  },
  {
    id: 'doc-4',
    name: 'University_Cloud_Migration_2024.pdf',
    type: 'pdf',
    uploadedAt: '2024-08-19',
    size: '5.6 MB',
    status: 'indexed',
    qaPairsCount: 61,
    isWinner: true,
    winRate: 100,
    lastUsed: '1 month ago',
    client: 'University of Leeds',
    sector: 'Education'
  },
  {
    id: 'doc-5',
    name: 'FinServ_Compliance_RFP_Response.docx',
    type: 'docx',
    uploadedAt: '2024-07-30',
    size: '2.4 MB',
    status: 'indexed',
    qaPairsCount: 44,
    isWinner: false,
    lastUsed: '2 months ago',
    client: 'Northern Finance Ltd',
    sector: 'Finance'
  },
  {
    id: 'doc-6',
    name: 'Healthcare_Data_Analytics_2023.pdf',
    type: 'pdf',
    uploadedAt: '2023-12-05',
    size: '4.8 MB',
    status: 'indexed',
    qaPairsCount: 55,
    isWinner: true,
    winRate: 100,
    lastUsed: '3 months ago',
    client: 'BUPA Healthcare',
    sector: 'Healthcare'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Sample RFP Questions (From a new RFP being processed)
// Based on real government and enterprise RFP patterns
// ─────────────────────────────────────────────────────────────────────────────
export const mockRFPQuestions: RFPQuestion[] = [
  {
    id: 'q-1',
    number: 1,
    category: 'Company Information',
    question: 'Provide a brief overview of your company, including year of establishment, ownership structure, and key milestones.'
  },
  {
    id: 'q-2',
    number: 2,
    category: 'Company Information',
    question: 'How many full-time employees do you have in the United Kingdom and the European Union?'
  },
  {
    id: 'q-3',
    number: 3,
    category: 'Technical Capability',
    question: 'Describe your data backup and disaster recovery procedures. Include Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO).'
  },
  {
    id: 'q-4',
    number: 4,
    category: 'Security & Compliance',
    question: 'What security certifications does your organization hold? Please list ISO, SOC, and any industry-specific certifications.'
  },
  {
    id: 'q-5',
    number: 5,
    category: 'Security & Compliance',
    question: 'Describe how you ensure GDPR compliance for all personal data processing activities.'
  },
  {
    id: 'q-6',
    number: 6,
    category: 'Security & Compliance',
    question: 'What is your data encryption policy for data at rest and data in transit?'
  },
  {
    id: 'q-7',
    number: 7,
    category: 'Technical Capability',
    question: 'Describe your approach to system scalability. How do you handle peak load periods?'
  },
  {
    id: 'q-8',
    number: 8,
    category: 'Service Delivery',
    question: 'What are your standard Service Level Agreements (SLAs) for system availability and support response times?'
  },
  {
    id: 'q-9',
    number: 9,
    category: 'Service Delivery',
    question: 'Describe your escalation procedures for critical incidents. Who is the point of contact for P1 issues?'
  },
  {
    id: 'q-10',
    number: 10,
    category: 'Experience',
    question: 'Provide three case studies of similar projects delivered for public sector clients in the last 3 years.'
  },
  {
    id: 'q-11',
    number: 11,
    category: 'Sustainability',
    question: 'Describe your organization\'s environmental and sustainability commitments. Do you have a Net Zero strategy?'
  },
  {
    id: 'q-12',
    number: 12,
    category: 'Financial',
    question: 'Provide evidence of financial stability, including your most recent audited accounts or credit rating.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Generated Answers (What the AI "drafted")
// ─────────────────────────────────────────────────────────────────────────────
export const mockGeneratedAnswers: GeneratedAnswer[] = [
  {
    questionId: 'q-1',
    answer: 'Founded in 2015, our company has grown from a team of 5 specialists to over 200 full-time professionals across the UK and Europe. We are a privately held company with no external shareholders, allowing us to maintain focus on long-term client relationships rather than quarterly targets. Key milestones include: achieving ISO 27001 certification in 2018, opening our European headquarters in Dublin in 2020, and being named a "Leader" in Gartner\'s Magic Quadrant for Managed IT Services in 2023.',
    confidence: 'high',
    confidenceScore: 94,
    sourceDocument: 'NHS_Digital_Infrastructure_Win_2024.pdf',
    sourcePage: 3,
    sourceSnippet: 'Section 1.2: Company Overview and History'
  },
  {
    questionId: 'q-2',
    answer: 'We currently employ 147 full-time employees in the United Kingdom, with our primary offices in London, Manchester, and Edinburgh. Within the European Union, we have 58 employees based primarily in our Dublin office (Ireland), with additional team members in Frankfurt and Amsterdam providing regional support for our continental European clients.',
    confidence: 'high',
    confidenceScore: 91,
    sourceDocument: 'City_Council_IT_Services_Tender_2024.docx',
    sourcePage: 5,
    sourceSnippet: 'Section 2.1: Organizational Structure and Staffing'
  },
  {
    questionId: 'q-3',
    answer: 'Our disaster recovery strategy employs a multi-tier approach with geographically distributed data centers. For Tier 1 (critical systems), we guarantee an RTO of 4 hours and RPO of 15 minutes through real-time replication. Tier 2 systems have an RTO of 8 hours with hourly backup snapshots. All backups are encrypted using AES-256 and stored in at least three separate locations. We conduct quarterly DR drills with full failover testing, and annual third-party audits verify our recovery capabilities against ISO 22301 standards.',
    confidence: 'high',
    confidenceScore: 97,
    sourceDocument: 'TechCorp_Cybersecurity_Proposal.pdf',
    sourcePage: 12,
    sourceSnippet: 'Section 4.3: Business Continuity and Disaster Recovery'
  },
  {
    questionId: 'q-4',
    answer: 'Our organization maintains the following active certifications:\n\n• ISO 27001:2022 - Information Security Management (certified since 2018, latest audit: September 2024)\n• ISO 9001:2015 - Quality Management System\n• SOC 2 Type II - Security, Availability, and Confidentiality\n• Cyber Essentials Plus (UK Government scheme)\n• PCI DSS Level 1 Service Provider\n• NHS Data Security and Protection Toolkit (Standards Met)\n\nAll certificates are available upon request and are audited annually by independent third-party assessors.',
    confidence: 'high',
    confidenceScore: 98,
    sourceDocument: 'NHS_Digital_Infrastructure_Win_2024.pdf',
    sourcePage: 8,
    sourceSnippet: 'Section 3.1: Security Certifications and Accreditations'
  },
  {
    questionId: 'q-5',
    answer: 'GDPR compliance is embedded into our operational framework through a comprehensive data governance program. Key measures include: appointment of a dedicated Data Protection Officer who reports directly to the Board; Privacy Impact Assessments (PIAs) for all new processing activities; mandatory annual GDPR training for all staff with 100% completion rate; Data Processing Agreements with all sub-processors; Article 30 records of processing activities maintained and reviewed quarterly; and established procedures for responding to data subject requests within 72 hours.',
    confidence: 'high',
    confidenceScore: 92,
    sourceDocument: 'Healthcare_Data_Analytics_2023.pdf',
    sourcePage: 15,
    sourceSnippet: 'Section 5.2: Data Protection and Privacy Framework'
  },
  {
    questionId: 'q-6',
    answer: 'We implement defense-in-depth encryption across all data states:\n\nData at Rest: AES-256 encryption for all stored data, with encryption keys managed through AWS KMS with automatic rotation every 365 days. Database-level encryption using Transparent Data Encryption (TDE).\n\nData in Transit: TLS 1.3 enforced for all external communications; mutual TLS (mTLS) for internal service-to-service communication. Legacy TLS versions are explicitly disabled across all endpoints.\n\nKey Management: Hardware Security Modules (HSMs) for critical key storage. All cryptographic implementations are reviewed annually against NIST guidelines.',
    confidence: 'high',
    confidenceScore: 95,
    sourceDocument: 'TechCorp_Cybersecurity_Proposal.pdf',
    sourcePage: 18,
    sourceSnippet: 'Section 4.5: Cryptographic Controls and Key Management'
  },
  {
    questionId: 'q-7',
    answer: 'Our platform is built on cloud-native architecture using Kubernetes, enabling horizontal auto-scaling based on real-time demand metrics. During peak periods, our system automatically provisions additional compute resources within 90 seconds, and scales down during low-usage periods to optimize costs. We maintain a 40% headroom capacity above normal peak loads. Load testing is performed quarterly simulating 3x normal traffic volumes. In 2024, we successfully supported a 280% traffic surge during a major public sector service launch without performance degradation.',
    confidence: 'medium',
    confidenceScore: 78,
    sourceDocument: 'University_Cloud_Migration_2024.pdf',
    sourcePage: 22,
    sourceSnippet: 'Section 6.1: Architecture and Scalability Approach'
  },
  {
    questionId: 'q-8',
    answer: 'Our standard SLAs for enterprise clients include:\n\n• System Availability: 99.95% uptime (equivalent to <22 minutes downtime per month), measured monthly with credits for underperformance\n• P1 (Critical) Response: 15 minutes, 4-hour resolution target\n• P2 (High) Response: 1 hour, 8-hour resolution target\n• P3 (Medium) Response: 4 hours, 24-hour resolution target\n• P4 (Low) Response: 8 hours, 5-day resolution target\n\nReal-time SLA compliance dashboards are provided to all clients. Our current trailing 12-month availability is 99.98%.',
    confidence: 'high',
    confidenceScore: 96,
    sourceDocument: 'City_Council_IT_Services_Tender_2024.docx',
    sourcePage: 28,
    sourceSnippet: 'Section 7.2: Service Level Commitments'
  },
  {
    questionId: 'q-9',
    answer: 'Our incident escalation follows ITIL best practices:\n\nP1 Critical Incidents: Automatic escalation to the on-call Incident Commander within 5 minutes. A dedicated bridge call is established and the client\'s designated contact is notified. Status updates every 30 minutes. Executive escalation to our CTO if unresolved within 2 hours.\n\nFor this contract, your designated 24/7 contact would be our Service Delivery Manager, supported by a team of 4 senior engineers with direct escalation authority. Post-incident reviews (PIRs) are conducted within 48 hours of resolution for all P1/P2 incidents.',
    confidence: 'high',
    confidenceScore: 89,
    sourceDocument: 'NHS_Digital_Infrastructure_Win_2024.pdf',
    sourcePage: 31,
    sourceSnippet: 'Section 8.1: Incident Management and Escalation'
  },
  {
    questionId: 'q-10',
    answer: 'Case Study 1: NHS England Digital Infrastructure (2024) - Delivered secure cloud migration for 12 NHS Trusts, handling 4.2 million patient records with zero data incidents. Project value: £2.8M, delivered 2 weeks ahead of schedule.\n\nCase Study 2: Manchester City Council IT Modernisation (2024) - Implemented hybrid cloud solution for 8,000 council staff, achieving 34% cost reduction and improved citizen service response times by 40%.\n\nCase Study 3: University of Leeds Research Platform (2024) - Built high-performance computing environment supporting 200 researchers, processing 50TB of data daily for medical research. Achieved ISO 27001 certification within project scope.',
    confidence: 'high',
    confidenceScore: 93,
    sourceDocument: 'University_Cloud_Migration_2024.pdf',
    sourcePage: 45,
    sourceSnippet: 'Section 9: Public Sector Case Studies'
  },
  {
    questionId: 'q-11',
    answer: 'Our organization is committed to achieving Net Zero by 2030, five years ahead of UK government targets. Current initiatives include: 100% renewable energy for all UK offices since 2022; carbon-neutral hosting through certified green data centers; company-wide electric vehicle scheme with 67% staff participation; annual third-party carbon footprint audits (Scope 1, 2, and 3); and a Supplier Code of Conduct requiring environmental commitments from all partners. We achieved a 42% reduction in carbon emissions between 2020 and 2024.',
    confidence: 'medium',
    confidenceScore: 74,
    sourceDocument: 'City_Council_IT_Services_Tender_2024.docx',
    sourcePage: 52,
    sourceSnippet: 'Section 10.2: Environmental and Social Governance'
  },
  {
    questionId: 'q-12',
    answer: 'We are pleased to confirm our strong financial position:\n\n• Annual Revenue (2023): £18.4M (22% YoY growth)\n• Net Profit Margin: 14.2%\n• Cash Reserves: £3.2M\n• Credit Rating: A (Dun & Bradstreet)\n• Zero long-term debt\n\nOur audited accounts (KPMG) for the last three financial years are available in Appendix B. We also hold Professional Indemnity Insurance of £10M and Public Liability Insurance of £5M.',
    confidence: 'high',
    confidenceScore: 88,
    sourceDocument: 'FinServ_Compliance_RFP_Response.docx',
    sourcePage: 58,
    sourceSnippet: 'Section 11: Financial Stability and Insurances'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// Stats Summary (For dashboard display)
// ─────────────────────────────────────────────────────────────────────────────
export const mockStats = {
  totalDocuments: mockDocuments.length,
  totalQAPairs: mockDocuments.reduce((sum, doc) => sum + doc.qaPairsCount, 0),
  winningBids: mockDocuments.filter(doc => doc.isWinner).length,
  questionsMatched: mockGeneratedAnswers.filter(a => a.confidence !== 'low').length,
  totalQuestions: mockRFPQuestions.length,
  averageConfidence: Math.round(
    mockGeneratedAnswers.reduce((sum, a) => sum + a.confidenceScore, 0) / mockGeneratedAnswers.length
  )
};

// ─────────────────────────────────────────────────────────────────────────────
// Category Colors (For visual organization)
// ─────────────────────────────────────────────────────────────────────────────
export const categoryColors: Record<string, string> = {
  'Company Information': '#3b82f6',
  'Technical Capability': '#8b5cf6',
  'Security & Compliance': '#ef4444',
  'Service Delivery': '#10b981',
  'Experience': '#f59e0b',
  'Sustainability': '#22c55e',
  'Financial': '#6366f1'
};
