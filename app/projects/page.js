import Link from 'next/link';
import SearchInput from '@/components/SearchInput';
import { Github, ExternalLink, Code2, Layers, Filter, Cpu } from 'lucide-react';
import AnimatedSection from '@/components/AnimatedSection';

async function getProjects(searchParams) {
    const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';
    let url = `${baseUrl}/api/projects`;

    if (searchParams?.q) {
        url = `${baseUrl}/api/search?q=${encodeURIComponent(searchParams.q)}`;
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return data.results || [];
    }

    if (searchParams?.skill) {
        url += `?skill=${encodeURIComponent(searchParams.skill)}`;
    }

    try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        console.error("Fetch projects error:", e);
        return [];
    }
}

async function getTopSkills() {
    const baseUrl = process.env.BETTER_AUTH_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseUrl}/api/skills/top`, { cache: 'no-store' });
        if (!res.ok) return [];
        return res.json();
    } catch {
        return [];
    }
}

export default async function ProjectsPage({ searchParams }) {
    let resolvedParams = searchParams;
    if (searchParams instanceof Promise) {
        resolvedParams = await searchParams;
    }

    const projects = await getProjects(resolvedParams);
    const topSkills = await getTopSkills();

    const isSearching = !!resolvedParams?.q;
    const isFiltering = !!resolvedParams?.skill;

    return (
        <div className="space-y-16 pb-24">
            {/* Header & Filter Section */}
            <section className="space-y-10">
                <AnimatedSection direction="down">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.2em] rounded-md">
                                Portfolio
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground leading-none">
                                All <span className="text-teal-600 underline decoration-teal-100 dark:decoration-teal-900 underline-offset-8">Work.</span>
                            </h1>
                            <p className="text-xl text-muted-foreground max-w-lg font-medium">
                                A curated selection of technical projects spanning full-stack development and electrical engineering.
                            </p>
                        </div>
                        <div className="w-full md:w-auto">
                            <SearchInput />
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection direction="up" delay={0.2}>
                    <div className="flex items-center gap-4 py-8 border-y border-border overflow-x-auto no-scrollbar">
                        <div className="flex items-center gap-2 text-muted-foreground mr-4 flex-shrink-0">
                            <Filter size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Filter By</span>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/projects"
                                className={`px-6 py-2.5 text-sm font-bold rounded-2xl border transition-all whitespace-nowrap ${!isFiltering && !isSearching ? 'bg-foreground text-background border-foreground shadow-xl shadow-teal-500/10' : 'bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground'}`}
                            >
                                Everything
                            </Link>
                            {topSkills.map((skill, i) => (
                                <Link
                                    key={skill}
                                    href={`/projects?skill=${encodeURIComponent(skill)}`}
                                    className={`px-6 py-2.5 text-sm font-bold rounded-2xl border transition-all whitespace-nowrap ${resolvedParams?.skill === skill ? 'bg-teal-600 text-white border-teal-600 shadow-xl shadow-teal-200' : 'bg-card text-muted-foreground border-border hover:border-teal-600 hover:text-teal-600'}`}
                                >
                                    {skill}
                                </Link>
                            ))}
                        </div>
                    </div>
                </AnimatedSection>
            </section>

            {/* Grid Section */}
            <section className="grid md:grid-cols-2 gap-12">
                {projects.length === 0 ? (
                    <AnimatedSection direction="up" className="col-span-full py-32 text-center space-y-6">
                        <div className="p-8 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 rounded-full w-fit mx-auto animate-bounce">
                            <Code2 size={64} strokeWidth={1} />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-3xl font-black text-foreground tracking-tight">System Clear.</h3>
                            <p className="text-muted-foreground text-lg">No projects match the current search criteria.</p>
                        </div>
                        <Link href="/projects" className="inline-block px-8 py-3 bg-foreground text-background rounded-xl font-bold hover:bg-teal-600 transition-colors">
                            Reset System
                        </Link>
                    </AnimatedSection>
                ) : (
                    projects.map((project, idx) => (
                        <AnimatedSection
                            key={idx}
                            direction="up"
                            delay={idx % 2 === 0 ? 0.1 : 0.2}
                        >
                            <div className="group relative flex flex-col bg-card border border-border rounded-[2.5rem] overflow-hidden hover:border-teal-200 transition-all duration-700 hover:shadow-[0_40px_80px_-15px_rgba(20,184,166,0.1)]">
                                {/* Status Tag */}
                                <div className="absolute top-6 left-6 z-10">
                                    <div className="flex items-center gap-1.5 px-3 py-1 bg-background/80 backdrop-blur-md rounded-full border border-border text-[10px] font-black uppercase tracking-tighter text-muted-foreground">
                                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                        Live Project
                                    </div>
                                </div>

                                {/* Top Accent */}
                                <div className="h-2 w-full bg-gradient-to-r from-teal-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                <div className="p-10 space-y-10 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center">
                                        <div className="p-5 bg-accent text-muted-foreground rounded-3xl group-hover:bg-teal-600 group-hover:text-white group-hover:rotate-12 transition-all duration-500">
                                            <Layers size={32} strokeWidth={1.5} />
                                        </div>
                                        <div className="flex gap-3">
                                            {project.links.map((link, i) => (
                                                <a
                                                    key={i}
                                                    href={link}
                                                    target="_blank"
                                                    className="p-4 bg-accent text-muted-foreground hover:text-foreground hover:bg-muted rounded-2xl transition-all duration-300"
                                                    title={link.includes('github') ? 'Source Code' : 'Live Demo'}
                                                >
                                                    {link.includes('github') ? <Github size={24} /> : <ExternalLink size={24} />}
                                                </a>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-3xl font-black text-foreground leading-tight group-hover:text-teal-600 transition-colors duration-500">
                                            {project.title}
                                        </h3>
                                        <p className="text-lg text-muted-foreground leading-relaxed font-medium text-pretty">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="mt-auto pt-10 space-y-4">
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mb-2 technical-mono">
                                            <Cpu size={12} />
                                            Technology Stack
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.skills.map(s => (
                                                <span key={s} className="text-[10px] font-black uppercase tracking-[0.05em] px-3 py-1.5 bg-accent/50 text-muted-foreground rounded-lg border border-border group-hover:bg-teal-50 group-hover:text-teal-600 dark:group-hover:bg-teal-900/30 dark:group-hover:text-teal-400 transition-all duration-500 technical-mono">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </AnimatedSection>
                    ))
                )}
            </section>
        </div>
    );
}
