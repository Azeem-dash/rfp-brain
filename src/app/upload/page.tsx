'use client';

import Sidebar from '@/components/layout/Sidebar';
import FileUpload from '@/components/ui/FileUpload';
import { categoryColors, mockRFPQuestions } from '@/data/mockData';
import { CheckCircle, ChevronRight, FileSearch, Search, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type ProcessingStage = 'idle' | 'uploading' | 'extracting' | 'matching' | 'complete';

export default function UploadPage() {
    const router = useRouter();
    const [stage, setStage] = useState<ProcessingStage>('idle');
    const [progress, setProgress] = useState(0);
    const [extractedQuestions, setExtractedQuestions] = useState<typeof mockRFPQuestions>([]);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            simulateProcessing();
        }
    };

    const simulateProcessing = () => {
        // Stage 1: Uploading
        setStage('uploading');
        setProgress(0);

        setTimeout(() => {
            setProgress(25);
            // Stage 2: Extracting Questions
            setStage('extracting');

            setTimeout(() => {
                setProgress(60);
                setExtractedQuestions(mockRFPQuestions);

                // Stage 3: Matching with Vault
                setStage('matching');

                setTimeout(() => {
                    setProgress(100);
                    setStage('complete');
                }, 1500);
            }, 2000);
        }, 1000);
    };

    const getStageInfo = () => {
        switch (stage) {
            case 'uploading':
                return {
                    icon: <div className="spinner"></div>,
                    text: 'Uploading RFP document...',
                    color: 'var(--color-info)'
                };
            case 'extracting':
                return {
                    icon: <FileSearch size={20} />,
                    text: `Extracting questions... Found ${extractedQuestions.length} questions`,
                    color: 'var(--color-warning)'
                };
            case 'matching':
                return {
                    icon: <Search size={20} />,
                    text: 'Matching with your Knowledge Vault...',
                    color: 'var(--color-accent)'
                };
            case 'complete':
                return {
                    icon: <CheckCircle size={20} />,
                    text: 'Analysis complete! Ready to generate draft.',
                    color: 'var(--color-success)'
                };
            default:
                return null;
        }
    };

    const stageInfo = getStageInfo();

    // Group questions by category
    const questionsByCategory = extractedQuestions.reduce((acc, q) => {
        if (!acc[q.category]) acc[q.category] = [];
        acc[q.category].push(q);
        return acc;
    }, {} as Record<string, typeof mockRFPQuestions>);

    return (
        <div className="app-container">
            <Sidebar />

            <main className="main-content">
                {/* Page Header */}
                <div className="page-header">
                    <h1 className="page-title">New RFP</h1>
                    <p className="page-description">
                        Upload your new RFP and let the Brain find the best answers from your vault.
                    </p>
                </div>

                {/* Upload Card */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Upload RFP Document</h3>
                            <p className="card-description">
                                We&apos;ll extract all questions and match them with your knowledge vault
                            </p>
                        </div>
                    </div>

                    {stage === 'idle' ? (
                        <FileUpload
                            onFilesSelected={handleFilesSelected}
                            multiple={false}
                            title="Drop your RFP here"
                            description="We'll automatically extract questions and find matching answers"
                        />
                    ) : (
                        <div>
                            {/* Progress Bar */}
                            <div style={{ marginBottom: 'var(--space-4)' }}>
                                <div className="progress-bar" style={{ height: '8px' }}>
                                    <div
                                        className="progress-fill"
                                        style={{
                                            width: `${progress}%`,
                                            transition: 'width 0.5s ease'
                                        }}
                                    ></div>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            {stageInfo && (
                                <div
                                    className="processing-indicator"
                                    style={{
                                        borderColor: stageInfo.color,
                                        background: `${stageInfo.color}10`
                                    }}
                                >
                                    <span style={{ color: stageInfo.color }}>{stageInfo.icon}</span>
                                    <span style={{ color: stageInfo.color }}>{stageInfo.text}</span>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Extracted Questions Preview */}
                {extractedQuestions.length > 0 && (
                    <div className="card fade-in">
                        <div className="card-header">
                            <div>
                                <h3 className="card-title">Extracted Questions</h3>
                                <p className="card-description">
                                    {extractedQuestions.length} questions found across {Object.keys(questionsByCategory).length} categories
                                </p>
                            </div>
                            {stage === 'complete' && (
                                <button
                                    className="btn btn-primary btn-lg"
                                    onClick={() => router.push('/draft')}
                                >
                                    <Zap size={18} />
                                    Generate Draft
                                    <ChevronRight size={18} />
                                </button>
                            )}
                        </div>

                        {/* Categories */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            {Object.entries(questionsByCategory).map(([category, questions]) => (
                                <div
                                    key={category}
                                    style={{
                                        padding: 'var(--space-4)',
                                        background: 'var(--color-bg-tertiary)',
                                        borderRadius: 'var(--radius-lg)',
                                        borderLeft: `3px solid ${categoryColors[category] || 'var(--color-accent)'}`
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: 'var(--space-3)'
                                    }}>
                                        <span style={{
                                            fontWeight: 'var(--font-weight-semibold)',
                                            color: categoryColors[category] || 'var(--color-accent)'
                                        }}>
                                            {category}
                                        </span>
                                        <span className="badge badge-accent">
                                            {questions.length} questions
                                        </span>
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'var(--space-2)'
                                    }}>
                                        {questions.map((q) => (
                                            <div
                                                key={q.id}
                                                style={{
                                                    fontSize: 'var(--font-size-sm)',
                                                    color: 'var(--color-text-secondary)',
                                                    paddingLeft: 'var(--space-3)',
                                                    borderLeft: '1px solid var(--color-border)'
                                                }}
                                            >
                                                <span style={{
                                                    color: 'var(--color-text-muted)',
                                                    marginRight: 'var(--space-2)'
                                                }}>
                                                    Q{q.number}.
                                                </span>
                                                {q.question.length > 100
                                                    ? q.question.substring(0, 100) + '...'
                                                    : q.question
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
