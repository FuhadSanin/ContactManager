import { useState } from "react"
import "./App.css"
import { Contact } from "./pages/Contact"
import { Heading } from "./pages/Heading"

function App() {
  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
      <Heading />
      <Contact />
    </div>
  )
}

export default App
