'use client';

import { Check, FileText, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

interface FileUploadProps {
    onFilesSelected: (files: File[]) => void;
    accept?: string;
    multiple?: boolean;
    title?: string;
    description?: string;
}

export default function FileUpload({
    onFilesSelected,
    accept = ".pdf,.docx,.doc",
    multiple = true,
    title = "Drop files here or click to upload",
    description = "Supports PDF and Word documents"
}: FileUploadProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files);
        handleFiles(files);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            handleFiles(files);
        }
    };

    const handleFiles = (files: File[]) => {
        const newFiles = [...uploadedFiles, ...files];
        setUploadedFiles(newFiles);
        onFilesSelected(newFiles);
    };

    const removeFile = (index: number) => {
        const newFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(newFiles);
        onFilesSelected(newFiles);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div>
            <div
                className={`upload-zone ${isDragOver ? 'dragover' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <Upload className="upload-zone-icon" />
                <h3 className="upload-zone-title">{title}</h3>
                <p className="upload-zone-description">{description}</p>
                <div className="upload-zone-formats">
                    <span className="badge badge-info">PDF</span>
                    <span className="badge badge-info">DOCX</span>
                    <span className="badge badge-info">DOC</span>
                </div>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileInput}
                    style={{ display: 'none' }}
                />
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
                <div className="document-list" style={{ marginTop: 'var(--space-4)' }}>
                    {uploadedFiles.map((file, index) => (
                        <div key={index} className="document-item fade-in">
                            <div className="document-icon">
                                <FileText size={24} />
                            </div>
                            <div className="document-info">
                                <div className="document-name">{file.name}</div>
                                <div className="document-meta">
                                    <span>{formatFileSize(file.size)}</span>
                                    <span>•</span>
                                    <span style={{ color: 'var(--color-success)' }}>
                                        <Check size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                        Ready to index
                                    </span>
                                </div>
                            </div>
                            <button
                                className="btn btn-ghost btn-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
