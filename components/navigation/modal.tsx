'use client'
import { useState, useEffect, ReactEventHandler } from "react";

interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export default function SpotlightModal({ notes, onClose, onNoteSelect }: {notes: Note[], onClose: () => void, onNoteSelect?: (note: Note) => void}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  // Filter notes by title/content
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(query.toLowerCase()) ||
    note.content.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { 
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredNotes.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && filteredNotes.length > 0) {
        e.preventDefault();
        onNoteSelect?.(filteredNotes[selectedIndex]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, filteredNotes, selectedIndex, onNoteSelect]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(), 150);
  };

  return (
    <div 
      className={`fixed inset-0 flex items-start justify-center pt-[15vh] z-50 transition-all duration-200
        ${isClosing ? 'opacity-0' : 'opacity-100'}`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      
      {/* Modal */}
      <div 
        className={`relative glass rounded-2xl w-full max-w-xl transition-all duration-200
          ${isClosing ? 'scale-95 opacity-0' : 'animate-scale-in'}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-[var(--border-light)]">
          <span className="text-[var(--text-muted)]">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
          <input
            className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--text-muted)] font-medium text-[var(--text-primary)]"
            placeholder="Search notes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
          <div className="flex items-center gap-1">
            <span className="kbd">ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2">
          {filteredNotes.length === 0 && (
            <div className="text-[var(--text-muted)] text-center py-12 select-none animate-fade-in">
              <span className="inline-block mb-3 opacity-50">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 15c1.5 1 3 1.5 4 1.5s2.5-.5 4-1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="9" cy="10" r="1" fill="currentColor"/>
                  <circle cx="15" cy="10" r="1" fill="currentColor"/>
                </svg>
              </span>
              <div className="text-sm font-medium">No notes found</div>
              <div className="text-xs mt-1 text-[var(--text-muted)]">Try a different search term</div>
            </div>
          )}
          {filteredNotes.map((note, index) => (
            <div
              key={note.id}
              className={`p-3 mb-1 rounded-xl cursor-pointer transition-all duration-150
                ${index === selectedIndex 
                  ? 'bg-[var(--accent-light)] border border-[var(--hover-border)]' 
                  : 'border border-transparent hover:bg-[var(--hover-bg)]'
                }`}
              onClick={() => onNoteSelect?.(note)}
              onMouseEnter={() => setSelectedIndex(index)}
              tabIndex={0}
              role="button"
              aria-label={`Select note: ${note.title}`}
            >
              <div className={`font-semibold text-sm truncate transition-colors duration-150
                ${index === selectedIndex ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'}`}>
                {note.title}
              </div>
              {note.content && (
                <div className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">
                  {note.content.replace(/<[^>]*>/g, '').substring(0, 80)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer with hints */}
        {filteredNotes.length > 0 && (
          <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border-light)] text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="kbd">↑↓</span> navigate
              </span>
              <span className="flex items-center gap-1">
                <span className="kbd">↵</span> open
              </span>
            </div>
            <span>{filteredNotes.length} note{filteredNotes.length !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>
    </div>
  );
}
