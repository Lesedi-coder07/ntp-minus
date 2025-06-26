'use client'
import { ReactEventHandler, useState } from "react"
import TextEditor from "@/components/notes/TextEditor"
import { Check } from "lucide-react"
import BottomBar from "@/components/navigation/bottom-bar"
import SpotlightModal from "@/components/navigation/modal"
import { useEffect } from "react"

const notes = [
  {
    id: "1",
    title: "Meeting Notes",
    content: "Discussed project milestones and assigned tasks to the team."
  },
  {
    id: "2",
    title: "Shopping List",
    content: "Eggs, milk, bread, and coffee."
  },
  {
    id: "3",
    title: "Pressure",
    content: "Explore multpiurbgeeopgje dsuibf ribefonsdarch features."
  },

  {
    id: "4",
    title: "Ideas",
    content: "Efnsfs-powered note suggestions fsdfsouidnfs foerfsdn quick search features."
  },
  {
    id: "5",
    title: "Physics",
    content: "Explore AI-powered note suggestions and quick search features."
  } ,{
    id: "6",
    title: "Computer Science",
    content: "Explore AI-powered note suggestions and quick search features."
  }
]

export default function Home () {
 let [updatingTitle, setUpdatingTitle] = useState<boolean>(false)
 let [title, setTitle] = useState<string>("New Note")
 const [showSearchModal, setShowSearchModal] = useState(false);


 const toggleUpdateTitle = () => {
    setUpdatingTitle(!updatingTitle)
 }
const ChangeTitle = (e: React.ChangeEvent<HTMLInputElement >) => {
 let input = e.currentTarget
 setTitle(input.value)


}

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
    className="pointer-events-auto flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300"
    aria-label="Open search"
    style={{ minWidth: "140px" }}
  >
  
    <span className="hidden sm:inline">⌘ + K  Search</span>
    <span className="inline sm:hidden">🔍</span>
  </button>
</div>
{showSearchModal && (
  <SpotlightModal
    notes={notes}
    onClose={() => setShowSearchModal(false)}
  />
)}

<div className="flex flex-row justify-center mt-12">
  
  <div className="flex-3 text-black max-w-[80%] mt-8 bg-white/80 rounded-xl shadow-lg p-8 min-h-[80vh] mx-auto transition-all duration-200">
    {!updatingTitle ? (
      <div
        className="mt-2 pt-1 cursor-pointer group flex items-center gap-2"
        onClick={toggleUpdateTitle}
        title="Edit title"
      >
        <h1 className="text-4xl font-bold tracking-tight group-hover:underline transition-all duration-150">
          {title}
        </h1>
        <span className="text-gray-400 text-base group-hover:text-gray-600 transition-colors duration-150">
          (edit)
        </span>
      </div>
    ) : (
      <div className="flex flex-row items-center gap-3 mt-2">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={ChangeTitle}
          className="outline-none h-12 text-4xl font-bold px-4 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all duration-150 bg-white/90 shadow"
          autoFocus
        />
        <button
          onClick={toggleUpdateTitle}
          className="rounded-full bg-green-500 hover:bg-green-600 transition-colors duration-150 p-2 flex items-center justify-center shadow-md"
          title="Save title"
        >
          <Check className="w-5 h-5 text-white" />
        </button>
      </div>
    )}
  <br />
   
    <TextEditor />

  </div>
  <BottomBar />
</div>
</> )
}