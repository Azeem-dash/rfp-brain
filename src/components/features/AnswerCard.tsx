'use client';

import { GeneratedAnswer, RFPQuestion, categoryColors } from '@/data/mockData';
import { AlertCircle, Check, CheckCircle, Clock, Copy, Edit3, FileText, MinusCircle, UserCheck } from 'lucide-react';
import { useState } from 'react';

interface AnswerCardProps {
    question: RFPQuestion;
    answer: GeneratedAnswer;
}

export default function AnswerCard({ question, answer }: AnswerCardProps) {
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedAnswer, setEditedAnswer] = useState(answer.answer);
    const [isVerified, setIsVerified] = useState(false);
    const [lastEditedTime, setLastEditedTime] = useState<string | null>(null);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(editedAnswer);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSaveEdit = () => {
        setIsEditing(false);
        setLastEditedTime('just now');
        // Simulate time progression for demo
        setTimeout(() => setLastEditedTime('1 min ago'), 60000);
    };

    const handleVerify = () => {
        setIsVerified(!isVerified);
    };

    const getConfidenceIcon = () => {
        switch (answer.confidence) {
            case 'high':
                return <CheckCircle size={14} />;
            case 'medium':
                return <AlertCircle size={14} />;
            case 'low':
                return <MinusCircle size={14} />;
        }
    };

    const categoryColor = categoryColors[question.category] || '#6366f1';

    return (
        <div className={`qa-card fade-in ${isVerified ? 'verified' : ''}`} style={{
            borderColor: isVerified ? 'var(--color-success)' : undefined,
            boxShadow: isVerified ? '0 0 0 1px rgba(16, 185, 129, 0.3), 0 0 20px rgba(16, 185, 129, 0.1)' : undefined
        }}>
            {/* Question Header */}
            <div className="qa-header">
                <div style={{ display: 'flex', alignItems: 'flex-start', flex: 1 }}>
                    <div className="qa-number">{question.number}</div>
                    <div>
                        <div
                            style={{
                                fontSize: 'var(--font-size-xs)',
                                color: categoryColor,
                                fontWeight: 'var(--font-weight-medium)',
                                marginBottom: 'var(--space-1)',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}
                        >
                            {question.category}
                        </div>
                        <div className="qa-question">{question.question}</div>
                    </div>
                </div>

                {/* Status Indicators */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    {/* Human Verification Checkbox */}
                    <label
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            cursor: 'pointer',
                            padding: 'var(--space-2) var(--space-3)',
                            borderRadius: 'var(--radius-md)',
                            background: isVerified ? 'var(--color-success-subtle)' : 'var(--color-bg-elevated)',
                            border: `1px solid ${isVerified ? 'var(--color-success)' : 'var(--color-border)'}`,
                            transition: 'all var(--transition-fast)'
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={isVerified}
                            onChange={handleVerify}
                            style={{ display: 'none' }}
                        />
                        <div style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: 'var(--radius-sm)',
                            border: `2px solid ${isVerified ? 'var(--color-success)' : 'var(--color-border-light)'}`,
                            background: isVerified ? 'var(--color-success)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all var(--transition-fast)'
                        }}>
                            {isVerified && <Check size={12} color="white" />}
                        </div>
                        <span style={{
                            fontSize: 'var(--font-size-xs)',
                            fontWeight: 'var(--font-weight-medium)',
                            color: isVerified ? 'var(--color-success)' : 'var(--color-text-secondary)'
                        }}>
                            {isVerified ? 'Verified' : 'Verify'}
                        </span>
                    </label>

                    {/* Confidence Score */}
                    <div className={`qa-confidence qa-confidence-${answer.confidence}`}>
                        <span className="qa-confidence-dot"></span>
                        {getConfidenceIcon()}
                        <span>{answer.confidenceScore}%</span>
                    </div>
                </div>
            </div>

            {/* Answer Body */}
            <div className="qa-body">
                {isEditing ? (
                    <textarea
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                        style={{
                            width: '100%',
                            minHeight: '150px',
                            padding: 'var(--space-3)',
                            background: 'var(--color-bg-tertiary)',
                            border: '1px solid var(--color-accent)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--color-text-primary)',
                            fontFamily: 'inherit',
                            fontSize: 'var(--font-size-sm)',
                            lineHeight: 'var(--line-height-relaxed)',
                            resize: 'vertical'
                        }}
                    />
                ) : (
                    <div className="qa-answer" style={{ whiteSpace: 'pre-line' }}>
                        {editedAnswer}
                    </div>
                )}

                {/* Footer with Citation, Human-in-the-loop status, and Actions */}
                <div className="qa-footer">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
                        {/* Citation */}
                        <div className="qa-citation">
                            <FileText size={14} />
                            <span>Source:</span>
                            <span className="qa-citation-link">{answer.sourceDocument}</span>
                            <span style={{ color: 'var(--color-text-muted)' }}>• Page {answer.sourcePage}</span>
                        </div>

                        {/* Human-in-the-loop Status */}
                        {(lastEditedTime || isVerified) && (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-2)',
                                fontSize: 'var(--font-size-xs)',
                                color: 'var(--color-text-tertiary)',
                                padding: 'var(--space-2) var(--space-3)',
                                background: 'var(--color-bg-tertiary)',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                {lastEditedTime && (
                                    <>
                                        <Clock size={12} />
                                        <span>Edited by you {lastEditedTime}</span>
                                    </>
                                )}
                                {lastEditedTime && isVerified && <span>•</span>}
                                {isVerified && (
                                    <>
                                        <UserCheck size={12} style={{ color: 'var(--color-success)' }} />
                                        <span style={{ color: 'var(--color-success)' }}>Human verified</span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="qa-actions">
                        <button
                            className={`btn btn-sm ${copied ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={copyToClipboard}
                            style={{ minWidth: '100px' }}
                        >
                            {copied ? (
                                <>
                                    <CheckCircle size={14} />
                                    Copied!
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    Copy
                                </>
                            )}
                        </button>
                        <button
                            className={`btn btn-sm ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => isEditing ? handleSaveEdit() : setIsEditing(true)}
                        >
                            <Edit3 size={14} />
                            {isEditing ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
