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
      // Use Ctrl+K (Windows/Linux) or Command+K (Mac) to open Spotlight
      if (
        (e.ctrlKey || e.metaKey) && // Ctrl on Windows/Linux, Command on Mac
        e.key.toLowerCase() === "k"
      ) {
        e.preventDefault();
        setShowSearchModal(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [])

  // Use blue-500/blue-600/blue-300 for a clean, simple look
  return(
<> 
<div className="w-full flex justify-center items-center fixed top-7 left-0 z-40 pointer-events-none">
  <button
    onClick={() => setShowSearchModal(true)}
    className="pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-full  text-black font-semibold transition-all duration-150 "
    aria-label="Open search"
    style={{ minWidth: "140px" }}
  >
  
    <span className="hidden sm:inline">⌘ + K </span>  
   
  </button>
</div>
{showSearchModal && (
  <SpotlightModal
    notes={notes}
    onClose={() => setShowSearchModal(false)}
    onNoteSelect={handleNoteSelect}
  />
)}

<div className="flex flex-row justify-center mt-12">
  
  <div className="flex-3 text-black max-w-[80%] mt-8 bg-white/80 rounded-xl  p-8 min-h-[120vh] mx-auto transition-all duration-200">
    {!updatingTitle ? (
      <div
        className="mt-2 pt-1 cursor-pointer group flex items-center gap-2"
        onClick={toggleUpdateTitle}
        title="Edit title"
      >
        <h1 className="text-4xl font-bold tracking-tight group-hover:underline transition-all duration-150">
          {title}
        </h1>
        
      </div>
    ) : (
      <div className="flex flex-row w-full  items-center gap-3 mt-2">
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
          className="outline-none border-0 h-12 w-full text-4xl font-bold px-4 rounded-lg  bg-white/90 "
          autoFocus
        />
      
      </div>
    )}
  <br />
   
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