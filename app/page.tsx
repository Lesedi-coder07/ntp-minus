'use client'
import { ReactEventHandler, useState } from "react"
import TextEditor from "@/components/notes/TextEditor"
import { Check } from "lucide-react"
import BottomBar from "@/components/navigation/bottom-bar"

export default function Home () {
 let [updatingTitle, setUpdatingTitle] = useState<boolean>(false)
 let [title, setTitle] = useState<string>("New Note")

 const toggleUpdateTitle = () => {
    setUpdatingTitle(!updatingTitle)
 }
const ChangeTitle = (e: React.ChangeEvent<HTMLInputElement >) => {
 let input = e.currentTarget
 setTitle(input.value)
}
  return(
<> 

<div className="flex flex-row justify-center">
  
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
          className="outline-none h-12 text-4xl font-bold px-4 rounded-lg border border-gray-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 transition-all duration-150 bg-white/90 shadow"
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