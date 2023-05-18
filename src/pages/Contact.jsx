import React, { useState, useEffect } from "react"
import { RiContactsLine, RiDeleteBinLine } from "react-icons/ri"
import { AiOutlineEdit } from "react-icons/ai"
import { Heading } from "./Heading"
import "./Contact.css"
import AOS from "aos"
import "aos/dist/aos.css"
const LOCAL_STORAGE_KEY = "contacts"

export const Contact = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true })
  }, [])
  const [contact, setContact] = useState(null) // Update initial state to null
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [searchData, setSearchData] = useState("")

  var showDate = new Date()
  var displayTime = showDate.getHours() - 12 + ":" + showDate.getMinutes()

  const handleSubmit = e => {
    e.preventDefault()
  }

  let searchContact = contact
    ? contact.filter(check => {
        return check.name.includes(searchData)
      })
    : []

  useEffect(() => {
    const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedContacts) {
      setContact(JSON.parse(storedContacts))
    } else {
      setContact([]) // Set an empty array if no data is available
    }
  }, [])

  useEffect(() => {
    if (contact !== null) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contact))
    }
  }, [contact])

  const addContactHandler = () => {
    if (name === "" || phone === "" || isNaN(phone)) {
      alert("Please fill out all fields")
      return
    } else {
      setName("")
      setPhone("")
      setContact([...contact, { id: Date.now(), name, phone }])
    }
  }

  const deleteContactHandler = id => {
    window.alert("Are you sure you want to delete this contact?")
    const newContactList = contact.filter(check => {
      return check.id !== id
    })
    setContact(newContactList)
  }

  return (
    <div className="flex flex-col items-center justify-center h-fit gap-10">
      <Heading />
      <div className="w-full flex justify-center">
        <input
          onChange={e => setSearchData(e.target.value)}
          type="text"
          className="w-[50%] outline-none border-[1px] border-gray-300 rounded-lg placeholder:p-6 p-2 shadow-inner"
          placeholder="Search"
        />
      </div>
      <div className="flex w-full flex-col items-center pb-6 justify-center sm:flex-row sm:gap-40 gap-10">
        <div className="flex flex-col items-center justify-center w-[350px]  sm:w-[450px] h-[300px] rounded-2xl gradient border-black overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-[80%] text-black  justify-center items-center"
          >
            <div class="relative z-0 w-full mb-3 group">
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                name="floating_email"
                id="floating_email"
                class="block py-2.5 px-0 w-full shadow-inner text-sm text-gray-900 bg-transparent border-0  border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_email"
                class="peer-focus:font-medium absolute pl-2 text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Full Name
              </label>
            </div>
            <div class="relative z-0 w-full mb-3 group">
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                name="floating_number"
                id="floating_number"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent   shadow-inner border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-teal-500 focus:outline-none focus:ring-0 focus:border-teal-600 peer"
                placeholder=" "
                required
              />
              <label
                for="floating_number"
                class="peer-focus:font-medium pl-3 absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-teal-600 peer-focus:dark:text-teal-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <button
              onClick={addContactHandler}
              className=" flex-shrink-0 bg-teal-500 duration-[0.4s] hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
            >
              Add Contact
            </button>
          </form>
        </div>
        <div className="sm:w-[500px] w-[350px] h-[500px] gradient flex flex-col items-center overflow-y-auto text-white rounded-2xl  overflow-hidden pt-9 pb-9 gap-4">
          {contact &&
            searchContact.map(item => {
              return (
                <div
                  data-aos="flip-up"
                  key={item.id}
                  className="w-[80%] shadow-inner border-[1px] border-gray-200 flex pl-4 pr-4 pt-3 pb-3 items-center rounded-3xl gap-5 bg-white text-black"
                >
                  <div className="w-[20%]">
                    <RiContactsLine className="icons text-3xl" />
                  </div>
                  <div className="flex flex-col text-black w-[100%]">
                    <h2 className="font-semibold text-xl">{item.name}</h2>
                    <h2>{item.phone}</h2>
                    <p className="text-[10px] text-gray-600">{displayTime}</p>
                  </div>
                  <div className="flex w-full justify-end text-2xl gap-3">
                    <AiOutlineEdit className="icons" />
                    <RiDeleteBinLine
                      className="icons text-red-500"
                      key={item.id}
                      onClick={() => deleteContactHandler(item.id)}
                    />
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
