import React, { useState, useEffect } from "react"
import { RiContactsLine, RiDeleteBinLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"

export const Contact = () => {
  const LOCAL_STORAGE_KEY = "contact"
  const [contact, setContact] = useState([])
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [searchData, setSearchData] = useState("")

  const handleSubmit = e => {
    e.preventDefault()
    console.log(contact)
  }

  //includes is used to check if a string is included in another string
  let searchContact = contact.filter(check => {
    return check.name.includes(searchData)
  })

  // useEffect is used to run a function when the component is rendered
  // LocalStorage is used to store data in the browser

  // parse is used to convert a string to an object
  useEffect(() => {
    const storageContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storageContact) setContact(storageContact)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contact))
  }, [contact])

  const addContactHandler = () => {
    if (name == "" || phone == "" || isNaN(phone)) {
      alert("Please fill out all fields")
      return
    } else {
      setName("")
      setPhone("")
      setContact([...contact, { id: Date.now(), name, phone }])
    }
  }

  const deleteContactHandler = id => {
    const newContactList = contact.filter(check => {
      return check.id !== id
    })
    setContact(newContactList)
  }
  return (
    <div>
      <div>
        <input
          onChange={e => setSearchData(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-96">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <input
            type="text"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            placeholder="Phone"
          />
          <button onClick={addContactHandler} className="bg-black text-white">
            Save
          </button>
        </form>
      </div>
      <div className="w-full h-fit bg-slate-300">
        {searchContact.map(item => {
          return (
            <div key={item.id}>
              <RiContactsLine className="icons" />
              <h2 className="text-2xl">{item.name}</h2>
              <h2>{item.phone}</h2>
              <AiOutlineEdit className="icons" />
              <RiDeleteBinLine
                className="icons"
                key={item.id}
                onClick={() => deleteContactHandler(item.id)}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
