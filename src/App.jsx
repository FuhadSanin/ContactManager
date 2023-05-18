import { useState } from "react"
import "./App.css"
import { Contact } from "./pages/Contact"
import { Heading } from "./pages/Heading"
import { Landing } from "./pages/Landing/Landing"

function App() {
  return (
    <div className="h-screen w-full">
      <Landing />
    </div>
  )
}

export default App
