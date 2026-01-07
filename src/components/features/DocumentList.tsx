'use client';

import { Document } from '@/data/mockData';
import { ExternalLink, FileText, Trash2, Trophy } from 'lucide-react';

interface DocumentListProps {
    documents: Document[];
    onDelete?: (id: string) => void;
}

export default function DocumentList({ documents, onDelete }: DocumentListProps) {
    const getFileIcon = (type: 'pdf' | 'docx') => {
        return type === 'pdf' ? '#ef4444' : '#3b82f6';
    };

    return (
        <div className="document-list">
            {documents.map((doc, index) => (
                <div
                    key={doc.id}
                    className="document-item fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    <div
                        className="document-icon"
                        style={{ background: `${getFileIcon(doc.type)}20`, color: getFileIcon(doc.type) }}
                    >
                        <FileText size={24} />
                    </div>

                    <div className="document-info">
                        <div className="document-name" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            {doc.name}
                            {doc.isWinner && (
                                <span className="badge badge-winner" style={{ marginLeft: 'var(--space-2)' }}>
                                    <Trophy size={10} />
                                    Winning Bid
                                </span>
                            )}
                        </div>
                        <div className="document-meta">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.qaPairsCount} Q&A pairs</span>
                            <span>•</span>
                            <span>{doc.sector}</span>
                            {doc.lastUsed && (
                                <>
                                    <span>•</span>
                                    <span>Used {doc.lastUsed}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        {doc.status === 'indexed' ? (
                            <span className="badge badge-success">Indexed</span>
                        ) : doc.status === 'processing' ? (
                            <span className="badge badge-warning">
                                <span className="spinner" style={{ width: '10px', height: '10px' }}></span>
                                Processing
                            </span>
                        ) : (
                            <span className="badge badge-error">Error</span>
                        )}
                    </div>

                    <div className="document-actions">
                        <button className="btn btn-ghost btn-icon" title="View Document">
                            <ExternalLink size={16} />
                        </button>
                        {onDelete && (
                            <button
                                className="btn btn-ghost btn-icon"
                                title="Remove"
                                onClick={() => onDelete(doc.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
