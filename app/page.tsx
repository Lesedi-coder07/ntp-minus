'use client'
import { ReactEventHandler, useState } from "react"
import TextEditor from "@/components/notes/TextEditor"
import { Check } from "lucide-react"
import BottomBar from "@/components/navigation/bottom-bar"
import SpotlightModal from "@/components/navigation/modal"
import { useEffect } from "react"
import { notesStorage, Note } from "./storage/notes"

export default function Home () {
 let [updatingTitle, setUpdatingTitle] = useState<boolean>(false)
 let [title, setTitle] = useState<string>("New Note");
 const [showSearchModal, setShowSearchModal] = useState(false);
 const [currentNote, setCurrentNote] = useState<Note | null>(null);
 const [notes, setNotes] = useState<Note[]>([]);

 // Initialize notes and current note from localStorage
 useEffect(() => {
   const loadNotes = () => {
     const allNotes = notesStorage.getAll();
     setNotes(allNotes);
     
     // Get current note or create a new one if none exists
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

 // Update current note when title changes
 useEffect(() => {
   if (currentNote) {
     notesStorage.updateTitle(currentNote.id, title);
     const updatedNote = { ...currentNote, title, updatedAt: new Date() };
     setCurrentNote(updatedNote);
     setNotes(prev => prev.map(note => note.id === currentNote.id ? updatedNote : note));
   }
 }, [title, currentNote]);

 useEffect(()=> {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (  e.key === "v" && (e.metaKey)) {
        e.preventDefault();
        toggleUpdateTitle();
      }
      
      if (e.key === "Enter" && updatingTitle) {
        e.preventDefault();
        toggleUpdateTitle();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown)
 },[updatingTitle])


 const toggleUpdateTitle = () => {
    setUpdatingTitle(!updatingTitle)
 }
const ChangeTitle = (e: React.ChangeEvent<HTMLInputElement >) => {
 let input = e.currentTarget
 setTitle(input.value)
}

// Handle note selection from search modal
const handleNoteSelect = (note: Note) => {
  setCurrentNote(note);
  setTitle(note.title);
  notesStorage.setCurrentNoteId(note.id);
  setShowSearchModal(false);
};

// Handle creating a new note
const handleNewNote = () => {
  const newNote = notesStorage.createNew();
  setCurrentNote(newNote);
  setTitle(newNote.title);
  setNotes(prev => [...prev, newNote]);
};

   

  // Add keyboard shortcut: Alt+S (Windows/Linux) or Option+S (Mac) to open Spotlight
  // Attach effect to listen for keydown


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use Ctrl+K (Windows/Linux) or Command+K (Mac) to toggle Spotlight
      if (
        (e.ctrlKey || e.metaKey) && // Ctrl on Windows/Linux, Command on Mac
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setShowSearchModal(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [])



  return(
<> 
<div className="w-full flex justify-center items-center fixed top-5 left-0 z-40 pointer-events-none">
  <button
    onClick={() => setShowSearchModal(true)}
    className="pointer-events-auto flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#666666] font-medium text-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-all duration-200 border border-transparent hover:border-[#A7D9ED]"
    aria-label="Open search"
  >
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-[#999999]">
      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M15 15l-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className="hidden sm:inline">Search...</span>
    <span className="text-xs text-[#999999] ml-1">⌘K</span>
  </button>
</div>
{showSearchModal && (
  <SpotlightModal
    notes={notes}
    onClose={() => setShowSearchModal(false)}
    onNoteSelect={handleNoteSelect}
  />
)}

<div className="flex flex-row justify-center mt-20 pb-20">
  <div className="w-full max-w-4xl mt-8 px-8 mx-auto">
    {!updatingTitle ? (
      <div
        className="cursor-pointer group mb-6"
        onClick={toggleUpdateTitle}
        title="Edit title"
      >
        <h1 className="text-3xl font-semibold text-[#333333] tracking-tight leading-tight">
          {title}
        </h1>
      </div>
    ) : (
      <div className="mb-6">
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
          className="outline-none border-0 h-14 w-full text-3xl font-semibold px-1 rounded-lg text-[#333333] tracking-tight leading-tight bg-transparent placeholder:text-[#999999]"
          autoFocus
        />
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
    />

  </div>
  <BottomBar onAddNote={handleNewNote} onFavoriteNote={() => {}} onDeleteNote={() => {}} />
</div>
</> )
}