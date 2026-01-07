'use client';

import {
    FileText,
    HelpCircle,
    Settings,
    Upload,
    Vault
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom geometric vault logo - diamond split in half suggesting a secure container
const VaultedLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top half of diamond */}
        <path
            d="M18 3L31 16H5L18 3Z"
            fill="url(#goldGradient)"
        />
        {/* Bottom half of diamond - with gap */}
        <path
            d="M5 20L18 33L31 20H5Z"
            fill="url(#goldGradient)"
            opacity="0.7"
        />
        {/* Gradient definition */}
        <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
        </defs>
    </svg>
);

const navItems = [
    { href: '/vault', label: 'Knowledge Vault', icon: Vault },
    { href: '/upload', label: 'New RFP', icon: Upload },
    { href: '/draft', label: 'Draft Workspace', icon: FileText },
];

const bottomNavItems = [
    { href: '/settings', label: 'Settings', icon: Settings },
    { href: '/help', label: 'Help & Support', icon: HelpCircle },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="sidebar">
            {/* Premium Geometric Logo */}
            <div className="logo" style={{ alignItems: 'flex-start' }}>
                <VaultedLogo />
                <div style={{ marginLeft: '2px' }}>
                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '1.35rem',
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                        color: '#f8fafc',
                        lineHeight: 1
                    }}>
                        VAULTED
                    </div>
                    <div style={{
                        fontSize: '0.6rem',
                        color: '#c2b280',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        marginTop: '4px',
                        fontWeight: 500
                    }}>
                        Proposal Intelligence
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav style={{ flex: 1 }}>
                <ul className="nav-menu">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                    style={isActive ? {
                                        background: 'rgba(251, 191, 36, 0.1)',
                                        color: '#fbbf24',
                                        boxShadow: 'inset 0 0 0 1px rgba(251, 191, 36, 0.4)'
                                    } : undefined}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <nav>
                <ul className="nav-menu">
                    {bottomNavItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Usage Stats - Premium Style */}
            <div style={{
                marginTop: 'var(--space-4)',
                padding: 'var(--space-4)',
                background: 'linear-gradient(135deg, rgba(194, 178, 128, 0.08), rgba(194, 178, 128, 0.02))',
                border: '1px solid rgba(194, 178, 128, 0.15)',
                borderRadius: 'var(--radius-lg)'
            }}>
                <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: '#c2b280',
                    marginBottom: 'var(--space-2)',
                    fontWeight: 600,
                    letterSpacing: '0.1em'
                }}>
                    KNOWLEDGE INDEXED
                </div>
                <div style={{
                    fontSize: 'var(--font-size-2xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: '#f8fafc'
                }}>
                    297
                </div>
                <div style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-tertiary)'
                }}>
                    Q&A pairs from 6 documents
                </div>
            </div>
        </aside>
    );
}
