'use client';

import AnswerCard from '@/components/features/AnswerCard';
import Sidebar from '@/components/layout/Sidebar';
import { mockGeneratedAnswers, mockRFPQuestions, mockStats } from '@/data/mockData';
import {
    AlertCircle,
    CheckCircle,
    ChevronDown,
    Copy,
    Download,
    FileDown,
    FileText,
    MinusCircle
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function DraftPage() {
    const [exportOpen, setExportOpen] = useState(false);
    const [copyAllSuccess, setCopyAllSuccess] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setExportOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Match questions with answers
    const qaItems = mockRFPQuestions.map(question => ({
        question,
        answer: mockGeneratedAnswers.find(a => a.questionId === question.id)!
    }));

    const highConfidence = qaItems.filter(item => item.answer?.confidence === 'high').length;
    const mediumConfidence = qaItems.filter(item => item.answer?.confidence === 'medium').length;
    const lowConfidence = qaItems.filter(item => item.answer?.confidence === 'low').length;

    const handleCopyAll = () => {
        const allContent = qaItems.map(item =>
            `Q${item.question.number}. ${item.question.question}\n\nA: ${item.answer.answer}\n\nSource: ${item.answer.sourceDocument}, Page ${item.answer.sourcePage}\n\n---\n`
        ).join('\n');

        navigator.clipboard.writeText(allContent);
        setCopyAllSuccess(true);
        setTimeout(() => setCopyAllSuccess(false), 2000);
    };

    const handleExport = (format: string) => {
        // In a real app, this would trigger a download
        alert(`Exporting as ${format}... (Demo mode - this would download a real file in production)`);
        setExportOpen(false);
    };

    return (
        <div className="app-container">
            <Sidebar />

            <main className="main-content">
                {/* Page Header */}
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <h1 className="page-title">Draft Workspace</h1>
                        <p className="page-description">
                            Review and refine your AI-generated responses. <strong>Verify each answer</strong> before export —
                            you&apos;re the expert, the AI is your assistant.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                        <button
                            className={`btn ${copyAllSuccess ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={handleCopyAll}
                        >
                            {copyAllSuccess ? (
                                <>
                                    <CheckCircle size={16} />
                                    Copied All!
                                </>
                            ) : (
                                <>
                                    <Copy size={16} />
                                    Copy All
                                </>
                            )}
                        </button>

                        {/* Export Dropdown */}
                        <div className={`dropdown ${exportOpen ? 'open' : ''}`} ref={dropdownRef}>
                            <button
                                className="btn btn-primary"
                                onClick={() => setExportOpen(!exportOpen)}
                            >
                                <Download size={16} />
                                Export
                                <ChevronDown size={16} />
                            </button>
                            <div className="dropdown-menu">
                                <div
                                    className="dropdown-item"
                                    onClick={() => handleExport('Word (.docx)')}
                                >
                                    <FileText size={16} />
                                    Export to Word (.docx)
                                </div>
                                <div
                                    className="dropdown-item"
                                    onClick={() => handleExport('PDF')}
                                >
                                    <FileDown size={16} />
                                    Export to PDF
                                </div>
                                <div
                                    className="dropdown-item"
                                    onClick={() => handleExport('Markdown')}
                                >
                                    <FileText size={16} />
                                    Export as Markdown
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress & Stats Bar */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 'var(--space-4)'
                    }}>
                        {/* Progress */}
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--space-2)'
                            }}>
                                <span style={{ fontWeight: 'var(--font-weight-medium)' }}>
                                    Draft Progress
                                </span>
                                <span style={{ color: 'var(--color-accent-light)' }}>
                                    {qaItems.length}/{mockRFPQuestions.length} questions matched
                                </span>
                            </div>
                            <div className="progress-bar">
                                <div
                                    className="progress-fill"
                                    style={{ width: `${(qaItems.length / mockRFPQuestions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Confidence Breakdown */}
                        <div style={{
                            display: 'flex',
                            gap: 'var(--space-6)',
                            padding: 'var(--space-3) var(--space-4)',
                            background: 'var(--color-bg-tertiary)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <CheckCircle size={16} style={{ color: 'var(--color-success)' }} />
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    High: <strong style={{ color: 'var(--color-success)' }}>{highConfidence}</strong>
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <AlertCircle size={16} style={{ color: 'var(--color-warning)' }} />
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    Medium: <strong style={{ color: 'var(--color-warning)' }}>{mediumConfidence}</strong>
                                </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                <MinusCircle size={16} style={{ color: 'var(--color-error)' }} />
                                <span style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
                                    Low: <strong style={{ color: 'var(--color-error)' }}>{lowConfidence}</strong>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Average Confidence Banner */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4) var(--space-5)',
                        background: 'var(--color-success-subtle)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: 'var(--space-6)'
                    }}
                >
                    <CheckCircle size={24} style={{ color: 'var(--color-success)' }} />
                    <div>
                        <div style={{ fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-success)' }}>
                            Average Confidence: {mockStats.averageConfidence}%
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
                            Your knowledge vault provided strong matches for most questions. Review medium/low confidence answers carefully.
                        </div>
                    </div>
                </div>

                {/* Q&A Cards */}
                <div>
                    {qaItems.map((item, index) => (
                        <div key={item.question.id} style={{ animationDelay: `${index * 50}ms` }}>
                            <AnswerCard
                                question={item.question}
                                answer={item.answer}
                            />
                        </div>
                    ))}
                </div>

                {/* Bottom Action Bar */}
                <div
                    style={{
                        position: 'sticky',
                        bottom: 'var(--space-4)',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'var(--space-3)',
                        padding: 'var(--space-4)',
                        background: 'var(--color-bg-secondary)',
                        borderRadius: 'var(--radius-xl)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-xl)',
                        marginTop: 'var(--space-8)'
                    }}
                >
                    <button className="btn btn-secondary" onClick={handleCopyAll}>
                        <Copy size={16} />
                        Copy All Answers
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={() => handleExport('Word (.docx)')}>
                        <Download size={18} />
                        Export to Word (.docx)
                    </button>
                </div>
            </main>
        </div>
    );
}
