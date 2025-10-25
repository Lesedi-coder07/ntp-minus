'use client'
import { Github } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full  backdrop-blur-sm border-b border-[#E5E5E5] z-50">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <div className="text-xl font-semibold text-[#333333]">
            Notepad <span className="text-[#666666]">Minus</span>
          </div>
          <div className="flex items-center gap-6">
           
            <a href="https://github.com/Lesedi-coder07/ntp-minus" className="text-[#666666] hover:text-[#333333] text-sm font-medium transition-colors">
              <Github className="w-5 h-5 text-[#666666]" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-semibold text-[#333333] mb-6 tracking-tight leading-tight">
            Write without distractions
          </h1>
          <p className="text-xl text-[#666666] mb-12 max-w-2xl mx-auto leading-relaxed">
            A minimal, local-first note-taking app designed to keep writers writing. 
            Your words stay on your device. Always.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/app" 
              className="px-8 py-4 bg-[#333333] text-white rounded-xl text-base font-medium hover:bg-[#444444] transition-all shadow-lg hover:shadow-xl"
            >
              Start Writing
            </a>
          
          </div>
          <p className="text-sm text-[#999999] mt-6">
             Open source • Local-first • Lightning fast
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-20 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-[#E5E5E5] overflow-hidden">
            <div className="bg-[#F5F5F5] px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
            </div>
            <div className="p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-semibold text-[#333333] mb-3">
                  Meeting Notes
                </h2>
              </div>
              <div className="prose prose-lg max-w-none">
                <p className="text-[#666666] leading-relaxed mb-4">
                  Focus on your words. Not the distractions. Notepad Minus strips away 
                  everything unnecessary so you can concentrate on what matters—your writing.
                </p>
                <p className="text-[#666666] leading-relaxed">
                  All your notes are stored locally on your device. No cloud sync. 
                  No account required. Just you and your words.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-semibold text-[#333333] text-center mb-16">
            Built for writers
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Local-first</h3>
              <p className="text-[#666666] leading-relaxed">
                Your notes stay on your device. No cloud required. No syncing. Just privacy and peace of mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M3 7V5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V17" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Minimal design</h3>
              <p className="text-[#666666] leading-relaxed">
                Clean, distraction-free interface that gets out of your way and keeps you focused on writing.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Markdown ready</h3>
              <p className="text-[#666666] leading-relaxed">
                Use familiar markdown formatting without the complexity. Bold, italic, headings—all at your fingertips.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Lightning fast</h3>
              <p className="text-[#666666] leading-relaxed">
                Instant search, seamless navigation, and snappy performance. No lag, no waiting.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Keyboard driven</h3>
              <p className="text-[#666666] leading-relaxed">
                Masterful keyboard shortcuts for power users. Navigate, search, and format without touching the mouse.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-[#E5E5E5] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-[#E0F2F7] rounded-xl flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#333333]">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#333333] mb-3">Open source</h3>
              <p className="text-[#666666] leading-relaxed">
                Built in the open. Contribute, fork, or customize to your heart's content. 
                The code is yours to explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="download" className="py-20 px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-semibold text-[#333333] mb-6">
            Start writing today
          </h2>
          <p className="text-xl text-[#666666] mb-12">
            Free, open source, and available now.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a 
              href="/home" 
              className="px-8 py-4 bg-[#333333] text-white rounded-xl text-base font-medium hover:bg-[#444444] transition-all shadow-lg"
            >
              Try It Now
            </a>
            <a 
              href="https://github.com/Lesedi-coder07/ntp-minus" 
              className="px-8 py-4 bg-white text-[#333333] rounded-xl text-base font-medium hover:bg-[#F5F5F5] transition-all border border-[#E5E5E5]"
            >
              View on GitHub
            </a>
          </div>
          <p className="text-sm text-[#999999] mt-6">
            macOS • Windows • Linux coming soon
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 border-t border-[#E5E5E5]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-sm text-[#666666]">
              © 2024 Notepad Minus. Made with ❤️ for writers.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-[#666666] hover:text-[#333333] transition-colors">
                GitHub
              </a>
              <a href="#" className="text-sm text-[#666666] hover:text-[#333333] transition-colors">
                Twitter
              </a>
              <a href="#" className="text-sm text-[#666666] hover:text-[#333333] transition-colors">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}