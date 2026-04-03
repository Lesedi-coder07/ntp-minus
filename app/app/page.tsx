'use client'
import { useState, useEffect, useCallback, useMemo } from "react"
import TextEditor from "@/components/notes/TextEditor"
import { Eye, EyeOff, Keyboard, Moon, Sun } from "lucide-react"
import BottomBar from "@/components/navigation/bottom-bar"
import SpotlightModal from "@/components/navigation/modal"
import { notesStorage, Note } from "../storage/notes"

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(date).getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 10) return 'just now';
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Home() {
  const [updatingTitle, setUpdatingTitle] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("New Note");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [focusMode, setFocusMode] = useState(false);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [wordCount, setWordCount] = useState({ words: 0, characters: 0 });
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode from localStorage and system preference
  useEffect(() => {
    const stored = localStorage.getItem('darkMode');
    if (stored !== null) {
      setDarkMode(stored === 'true');
    } else {
      // Check system preference
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

  // Initialize notes and current note from localStorage
  useEffect(() => {
    const loadNotes = () => {
      const allNotes = notesStorage.getAll();
      setNotes(allNotes);
      
      let current = notesStorage.getCurrentNote();
      if (!current && allNotes.length > 0) {
        current = allNotes[0];
        notesStorage.setCurrentNoteId(current.id);
      } else if (!current) {
        current = notesStorage.createNew();
      }
      
      setCurrentNote(current);
      setTitle(current.title);
    };

    loadNotes();
  }, []);

  // Update title when user finishes editing
  useEffect(() => {
    if (!updatingTitle && currentNote && currentNote.title !== title) {
      notesStorage.updateTitle(currentNote.id, title);
      const updatedNote = { ...currentNote, title, updatedAt: new Date() };
      setCurrentNote(updatedNote);
      setNotes(prev => prev.map(note => note.id === currentNote.id ? updatedNote : note));
    }
  }, [updatingTitle, title, currentNote?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && updatingTitle) {
        e.preventDefault();
        toggleUpdateTitle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [updatingTitle])


  const toggleUpdateTitle = () => {
    setUpdatingTitle(!updatingTitle)
  }

  const ChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.currentTarget
    setTitle(input.value)
  }

  const handleNoteSelect = (note: Note) => {
    setCurrentNote(note);
    setTitle(note.title);
    notesStorage.setCurrentNoteId(note.id);
    setShowSearchModal(false);
  };

  const handleNewNote = useCallback(() => {
    const newNote = notesStorage.createNew();
    setCurrentNote(newNote);
    setTitle(newNote.title);
    setNotes(prev => [...prev, newNote]);
  }, []);

  const handleDeleteNote = () => {
    notesStorage.delete(currentNote?.id || "");
    const remainingNotes = notes.filter(note => note.id !== currentNote?.id);
    setNotes(remainingNotes);
    
    if (remainingNotes.length > 0) {
      setCurrentNote(remainingNotes[0]);
      setTitle(remainingNotes[0].title);
      notesStorage.setCurrentNoteId(remainingNotes[0].id);
    } else {
      const newNote = notesStorage.createNew();
      setCurrentNote(newNote);
      setTitle(newNote.title);
      setNotes([newNote]);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Open search
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
        return;
      }
      
      // Ctrl/Cmd + J: New note
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "j" && !e.shiftKey) {
        e.preventDefault();
        handleNewNote();
        return;
      }

      // Ctrl/Cmd + .: Toggle focus mode
      if ((e.ctrlKey || e.metaKey) && e.key === ".") {
        e.preventDefault();
        setFocusMode(prev => !prev);
        return;
      }

      // ?: Toggle shortcuts panel (only when not typing)
      if (e.key === "?" && !updatingTitle && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }

      // Escape: Close shortcuts panel
      if (e.key === "Escape" && showShortcuts) {
        setShowShortcuts(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNewNote, updatingTitle, showShortcuts])

  // Formatted timestamp
  const lastUpdated = useMemo(() => {
    if (!currentNote?.updatedAt) return null;
    return formatRelativeTime(currentNote.updatedAt);
  }, [currentNote?.updatedAt]);

  const hasNotes = notes.length > 0 && currentNote;

  return (
    <div className={focusMode ? 'focus-mode' : ''}>
      {/* Search Button */}
      <div className="w-full flex justify-center items-center fixed top-5 left-0 z-40 pointer-events-none hide-in-focus">
        <button
          onClick={() => setShowSearchModal(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-xl glass glass-hover text-[var(--text-secondary)] font-medium text-sm transition-all duration-200 animate-fade-in-up"
          aria-label="Open search"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-[var(--text-muted)]">
            <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="hidden sm:inline">Search...</span>
          <span className="kbd ml-1">⌘K</span>
        </button>
      </div>

      {/* Focus Mode Toggle */}
      <button
        onClick={() => setFocusMode(!focusMode)}
        className={`fixed top-5 right-5 z-40 p-2.5 rounded-xl glass transition-all duration-300 btn-micro
          ${focusMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}
        aria-label={focusMode ? "Exit focus mode" : "Enter focus mode"}
        title={focusMode ? "Exit focus mode (⌘.)" : "Focus mode (⌘.)"}
      >
        {focusMode ? (
          <EyeOff className="w-4 h-4 text-[var(--text-muted)]" />
        ) : (
          <Eye className="w-4 h-4 text-[var(--text-muted)]" />
        )}
      </button>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed top-5 right-16 z-40 p-2.5 rounded-xl glass transition-all duration-300 btn-micro
          ${focusMode ? 'opacity-30 hover:opacity-100' : 'opacity-100'}`}
        aria-label={darkMode ? "Light mode" : "Dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? (
          <Sun className="w-4 h-4 text-[var(--text-muted)]" />
        ) : (
          <Moon className="w-4 h-4 text-[var(--text-muted)]" />
        )}
      </button>

      {/* Keyboard Shortcuts Help */}
      <button
        onClick={() => setShowShortcuts(!showShortcuts)}
        className="fixed top-5 right-[108px] z-40 p-2.5 rounded-xl glass transition-all duration-200 btn-micro hide-in-focus"
        aria-label="Keyboard shortcuts"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-4 h-4 text-[var(--text-muted)]" />
      </button>

      {/* Shortcuts Panel */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowShortcuts(false)}>
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div 
            className="relative glass rounded-2xl p-6 w-full max-w-sm animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Keyboard Shortcuts</h3>
            <div className="space-y-3">
              {[
                { keys: '⌘ K', action: 'Search notes' },
                { keys: '⌘ J', action: 'New note' },
                { keys: '⌘ .', action: 'Toggle focus mode' },
                { keys: '⌘ B', action: 'Bold text' },
                { keys: '⌘ I', action: 'Italic text' },
                { keys: '?', action: 'Show shortcuts' },
                { keys: 'ESC', action: 'Close dialogs' },
              ].map(({ keys, action }) => (
                <div key={keys} className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">{action}</span>
                  <span className="kbd">{keys}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <SpotlightModal
          notes={notes}
          onClose={() => setShowSearchModal(false)}
          onNoteSelect={handleNoteSelect}
        />
      )}

      {/* Main Content */}
      <div className="flex flex-row justify-center mt-20 pb-24">
        <div className={`w-full max-w-3xl mt-8 px-8 mx-auto transition-all duration-300 ${focusMode ? 'max-w-2xl' : ''}`}>
          {hasNotes ? (
            <>
              {/* Title Section */}
              {!updatingTitle ? (
                <div
                  className="cursor-pointer group mb-2 animate-fade-in"
                  onClick={toggleUpdateTitle}
                  title="Click to edit title"
                >
                  <h1 className="title-editable text-3xl font-bold text-[var(--text-primary)] tracking-tight leading-tight">
                    {title}
                  </h1>
                </div>
              ) : (
                <div className="mb-2 animate-fade-in">
                  <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={ChangeTitle}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        toggleUpdateTitle();
                      }
                    }}
                    onBlur={toggleUpdateTitle}
                    className="outline-none border-b-2 border-[var(--accent)] h-12 w-full text-3xl font-bold px-0 text-[var(--text-primary)] tracking-tight leading-tight bg-transparent placeholder:text-[var(--text-muted)]"
                    autoFocus
                  />
                </div>
              )}

              {/* Last Updated Timestamp */}
              {lastUpdated && (
                <div className="text-xs text-[var(--text-muted)] mb-6 animate-fade-in hide-in-focus" style={{ animationDelay: '0.05s' }}>
                  Updated {lastUpdated}
                </div>
              )}
            
              <TextEditor 
                currentNote={currentNote}
                onContentChange={(content: string) => {
                  if (currentNote) {
                    notesStorage.updateContent(currentNote.id, content);
                    const updatedNote = { ...currentNote, content, updatedAt: new Date() };
                    setCurrentNote(updatedNote);
                    setNotes(prev => prev.map(note => note.id === currentNote.id ? updatedNote : note));
                  }
                }}
                onStatsChange={setWordCount}
              />
            </>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in-up">
              <div className="w-20 h-20 rounded-2xl bg-[var(--accent-light)] flex items-center justify-center mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-[var(--accent)]">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">No notes yet</h2>
              <p className="text-[var(--text-muted)] mb-6 max-w-sm">
                Create your first note to get started. Your thoughts deserve a beautiful place to live.
              </p>
              <button
                onClick={handleNewNote}
                className="px-6 py-3 rounded-xl bg-[var(--accent)] text-[var(--background)] font-medium text-sm hover:bg-[var(--accent-hover)] transition-all duration-200 btn-micro"
              >
                Create your first note
              </button>
              <div className="mt-8 text-xs text-[var(--text-muted)]">
                or press <span className="kbd">⌘ J</span>
              </div>
            </div>
          )}
        </div>

        <BottomBar onAddNote={handleNewNote} onFavoriteNote={() => {}} onDeleteNote={handleDeleteNote} />
      </div>

      {/* Word Count Status Bar */}
      {hasNotes && (
        <div className="fixed bottom-20 left-0 w-full flex justify-center pointer-events-none z-30 hide-in-focus">
          <div className="text-xs text-[var(--text-muted)] animate-fade-in bg-[var(--background)]/80 backdrop-blur-sm px-4 py-1.5 rounded-full">
            {wordCount.words} {wordCount.words === 1 ? 'word' : 'words'} · {wordCount.characters} {wordCount.characters === 1 ? 'character' : 'characters'}
          </div>
        </div>
      )}
    </div>
  )
}
