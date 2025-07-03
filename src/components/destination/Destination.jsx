import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Destination = () => {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [routes, setRoutes] = useState([])
  const [startLocations, setStartLocations] = useState([])
  const [endLocations, setEndLocations] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get('https://localhost:7112/api/Route', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (Array.isArray(res.data)) {
          setRoutes(res.data)
          const starts = [...new Set(res.data.map(route => route.startLocation))]
          const ends = [...new Set(res.data.map(route => route.endLocation))]
          setStartLocations(starts)
          setEndLocations(ends)
        } else {
          console.error('Expected array but got:', res.data)
        }
      } catch (error) {
        console.error('Failed to load routes:', error)
      }
    }

    fetchRoutes()
  }, [])

  const handleFromChange = (e) => setFrom(e.target.value)
  const handleToChange = (e) => setTo(e.target.value)
  const isDestinationSelected = from && to

  return (
    <div className="w-full space-y-4">
      {!isDestinationSelected ? (
        <div className="w-full grid grid-cols-2 gap-10">
          <div>
            <label htmlFor="from" className="block mb-2 font-medium">
              From
            </label>
            <select
              name="from"
              value={from}
              onChange={handleFromChange}
              id="from"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:bg-white dark:focus:bg-neutral-800"
            >
              <option value="">Select Location</option>
              {startLocations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="to" className="block mb-2 font-medium">
              To
            </label>
            <select
              name="to"
              value={to}
              onChange={handleToChange}
              id="to"
              className="w-full appearance-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 bg-neutral-200/60 dark:bg-neutral-900/60 px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-md focus:outline-none focus:bg-white dark:focus:bg-neutral-800"
            >
              <option value="">Select Location</option>
              {endLocations.map((loc, idx) => (
                <option key={idx} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <h1 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
            Route Selected
          </h1>
          <div className="w-full flex items-center gap-x-3">
            <div className="w-fit text-base font-semibold">
              From: <span className="ml-1 font-medium">{from}</span>
            </div>
            <div className="flex-1">
              <div className="w-full h border border-dashed border-neutral-200 dark:border-neutral-800/80"></div>
            </div>
            <div className="w-fit text-base font-semibold">
              To: <span className="ml-1 font-medium">{to}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Destination
