'use client'
import { useState, useEffect } from "react";
import { Github, Moon, Sun, Sparkles, Shield, Zap, Keyboard, Eye, Code } from "lucide-react";
import Image from "next/image";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-[var(--background)] transition-colors duration-300">
      {/* Navigation */}
      <nav className="fixed top-0 w-full glass z-50 animate-fade-in">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-bold text-[var(--text-primary)]">
            Notepad <span className="text-[var(--accent)]">Minus</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-200 btn-micro"
              aria-label={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-[var(--text-muted)]" />
              ) : (
                <Moon className="w-5 h-5 text-[var(--text-muted)]" />
              )}
            </button>
            <a 
              href="https://github.com/Lesedi-coder07/ntp-minus" 
              className="p-2.5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-200 btn-micro"
              aria-label="View on GitHub"
            >
              <Github className="w-5 h-5 text-[var(--text-muted)]" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          
          <h1 className="text-[64px] md:text-[92px] font-bold text-[var(--text-primary)] mb-8 tracking-tighter leading-[1.1] animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Write without<br />
            <span className="text-[var(--accent)]">distractions</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A minimal, local-first note-taking app designed to keep writers writing. 
            Your words stay on your device. Always.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <a 
              href="/app" 
              className="px-8 py-4 bg-[var(--accent)] text-white rounded-xl text-base font-medium hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-lg hover:shadow-xl btn-micro"
            >
              Start Writing
            </a>
            <a 
              href="https://github.com/Lesedi-coder07/ntp-minus" 
              className="px-8 py-4 glass rounded-xl text-base font-medium text-[var(--text-primary)] hover:bg-[var(--hover-bg)] transition-all duration-200 btn-micro"
            >
              View Source
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-[var(--text-muted)] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              Open source
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              Local-first
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              Lightning fast
            </span>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass rounded-3xl overflow-hidden animate-fade-in-up">
            <div className="bg-[var(--card-bg)] border-b border-[var(--border-light)] px-6 py-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
              <span className="ml-4 text-sm text-[var(--text-muted)]">Notepad Minus</span>
            </div>
            <div className="p-12 bg-[var(--card-bg)]">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">
                  Meeting Notes
                </h2>
                <span className="text-xs text-[var(--text-muted)]">Updated just now</span>
              </div>
              <div className="space-y-4">
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  Focus on your words. Not the distractions. Notepad Minus strips away 
                  everything unnecessary so you can concentrate on what matters—<strong className="text-[var(--text-primary)]">your writing</strong>.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  All your notes are stored locally on your device. No cloud sync. 
                  No account required. Just you and your words.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-[var(--border-light)] flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">42 words · 256 characters</span>
                <div className="flex items-center gap-2">
                  <span className="kbd">⌘K</span>
                  <span className="text-xs text-[var(--text-muted)]">to search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
              Built for writers
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Every feature designed to keep you in the flow state
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Local-first",
                description: "Your notes stay on your device. No cloud required. No syncing. Just privacy and peace of mind."
              },
              {
                icon: Eye,
                title: "Focus mode",
                description: "Hide all distractions with a single keystroke. Just you and your words."
              },
              {
                icon: Moon,
                title: "Dark mode",
                description: "Easy on the eyes for late-night writing sessions. Automatically syncs with your system."
              },
              {
                icon: Zap,
                title: "Lightning fast",
                description: "Instant search, seamless navigation, and snappy performance. No lag, no waiting."
              },
              {
                icon: Keyboard,
                title: "Keyboard driven",
                description: "Powerful shortcuts for power users. Navigate, search, and format without touching the mouse."
              },
              {
                icon: Code,
                title: "Open source",
                description: "Built in the open. Contribute, fork, or customize. The code is yours to explore."
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="glass rounded-2xl p-8 hover:scale-[1.02] transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-12 h-12 bg-[var(--accent-light)] rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keyboard Shortcuts Preview */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-8 animate-fade-in-up">
            <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6 text-center">Keyboard shortcuts</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { keys: '⌘ K', action: 'Search notes' },
                { keys: '⌘ N', action: 'New note' },
                { keys: '⌘ .', action: 'Toggle focus mode' },
                { keys: '⌘ B', action: 'Bold text' },
                { keys: '⌘ I', action: 'Italic text' },
                { keys: '?', action: 'Show all shortcuts' },
              ].map(({ keys, action }) => (
                <div key={keys} className="flex items-center justify-between p-3 rounded-xl bg-[var(--background)]">
                  <span className="text-sm text-[var(--text-secondary)]">{action}</span>
                  <span className="kbd">{keys}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-24 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-6 animate-fade-in-up">
            Start writing today
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Free, open source, and available now.
          </p>
          <div className="flex items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <a 
              href="/app" 
              className="px-8 py-4 bg-[var(--accent)] text-white rounded-xl text-base font-medium hover:bg-[var(--accent-hover)] transition-all duration-200 shadow-lg btn-micro"
            >
              Try It Now
            </a>
            <a 
              href="https://github.com/Lesedi-coder07/ntp-minus" 
              className="px-8 py-4 glass rounded-xl text-base font-medium text-[var(--text-primary)] transition-all duration-200 btn-micro"
            >
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-[var(--text-muted)] mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Web app • Mobile coming soon
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-[var(--border-light)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-[var(--text-muted)]">
              © 2024 Notepad Minus. Made with ❤️ by{' '}
              <a href="https://github.com/Lesedi-coder07" className="hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1">
                <Image src="/dave-emoji.jpg" className="rounded-full inline-block" alt="Lesedi" width={20} height={20} />
              </a>
              {' '}for writers.
            </div>
            <div className="flex items-center gap-6">
              <a href="https://github.com/Lesedi-coder07/ntp-minus" className="text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors flex items-center gap-2">
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}