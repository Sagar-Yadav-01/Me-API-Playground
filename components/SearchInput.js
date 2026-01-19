'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

export default function SearchInput({ placeholder = "Search projects..." }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [term, setTerm] = useState(searchParams.get('q') || '');

    useEffect(() => {
        setTerm(searchParams.get('q') || '');
    }, [searchParams]);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (term.trim()) {
            params.set('q', term);
            params.delete('skill'); // Clear skill filter when searching text
        } else {
            params.delete('q');
        }
        router.push(`/projects?${params.toString()}`);
    };

    const clearSearch = () => {
        setTerm('');
        const params = new URLSearchParams(searchParams.toString());
        params.delete('q');
        router.push(`/projects?${params.toString()}`);
    };

    return (
        <form onSubmit={handleSearch} className="relative group w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-muted-foreground group-focus-within:text-teal-500 transition-colors" />
            </div>
            <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder={placeholder}
                className="block w-full pl-11 pr-12 py-3 bg-muted/50 border border-border rounded-2xl text-sm focus:bg-background focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 transition-all placeholder:text-muted-foreground"
            />
            {term && (
                <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground"
                >
                    <X size={16} />
                </button>
            )}
        </form>
    );
}
