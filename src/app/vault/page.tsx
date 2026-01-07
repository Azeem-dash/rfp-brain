'use client';

import DocumentList from '@/components/features/DocumentList';
import Sidebar from '@/components/layout/Sidebar';
import FileUpload from '@/components/ui/FileUpload';
import { mockDocuments, mockStats } from '@/data/mockData';
import { Brain, FileText, Sparkles, Trophy } from 'lucide-react';
import { useState } from 'react';

export default function VaultPage() {
    const [documents, setDocuments] = useState(mockDocuments);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleFilesSelected = (files: File[]) => {
        if (files.length > 0) {
            setIsProcessing(true);
            // Simulate processing delay
            setTimeout(() => {
                setIsProcessing(false);
            }, 2000);
        }
    };

    const handleDeleteDocument = (id: string) => {
        setDocuments(documents.filter(doc => doc.id !== id));
    };

    return (
        <div className="app-container">
            <Sidebar />

            <main className="main-content">
                {/* Page Header */}
                <div className="page-header">
                    <h1 className="page-title">Knowledge Vault</h1>
                    <p className="page-description">
                        Upload your winning proposals to build your company&apos;s AI-powered knowledge base.
                        The more you feed it, the smarter it gets.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-label">Documents Indexed</div>
                        <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <FileText size={28} style={{ opacity: 0.5 }} />
                            {documents.length}
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Q&A Pairs Extracted</div>
                        <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Brain size={28} style={{ opacity: 0.5 }} />
                            {mockStats.totalQAPairs}
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">Winning Bids</div>
                        <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Trophy size={28} style={{ opacity: 0.5 }} />
                            {mockStats.winningBids}
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-label">AI Readiness</div>
                        <div className="stat-value" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Sparkles size={28} style={{ opacity: 0.5 }} />
                            Ready
                        </div>
                        <div className="stat-change">✓ Your vault is ready to draft</div>
                    </div>
                </div>

                {/* Upload Section */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Add Documents</h3>
                            <p className="card-description">
                                Upload past proposals, bid responses, and company documentation
                            </p>
                        </div>
                    </div>
                    <FileUpload
                        onFilesSelected={handleFilesSelected}
                        title="Drop your winning proposals here"
                        description="We'll extract all Q&A pairs and add them to your knowledge vault"
                    />

                    {isProcessing && (
                        <div className="processing-indicator" style={{ marginTop: 'var(--space-4)' }}>
                            <div className="spinner"></div>
                            <span>Analyzing documents and extracting Q&A pairs...</span>
                        </div>
                    )}
                </div>

                {/* Document List */}
                <div className="card">
                    <div className="card-header">
                        <div>
                            <h3 className="card-title">Indexed Documents</h3>
                            <p className="card-description">
                                {documents.length} documents • {mockStats.totalQAPairs} Q&A pairs ready for matching
                            </p>
                        </div>
                    </div>

                    {documents.length > 0 ? (
                        <DocumentList documents={documents} onDelete={handleDeleteDocument} />
                    ) : (
                        <div className="empty-state">
                            <Brain className="empty-state-icon" />
                            <h3 className="empty-state-title">Your vault is empty</h3>
                            <p className="empty-state-description">
                                Upload your first winning proposal to start building your knowledge base.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
