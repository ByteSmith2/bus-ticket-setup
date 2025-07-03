import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MdOutlineChair } from 'react-icons/md'
import { GiSteeringWheel } from 'react-icons/gi'
import { RiMoneyRupeeCircleLine } from 'react-icons/ri'

const Seat = ({ seatNumber, isSelected, isBooked, onClick }) => {
  let className = 'text-3xl -rotate-90 '
  if (isBooked) className += 'text-red-500 cursor-not-allowed '
  else className += isSelected ? 'text-violet-600 cursor-pointer' : 'text-neutral-600 cursor-pointer'

  return <MdOutlineChair className={className} onClick={!isBooked ? onClick : undefined} />
}

const BusSeatLayout = ({ tripId }) => {
  const totalSeats = 41
  const [selectedSeats, setSelectedSeats] = useState([])
  const [bookedSeats, setBookedSeats] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await axios.post('https://localhost:7112/api/SeatInBusTrip/bulkByTrip', {
          tripId: tripId
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (Array.isArray(res.data)) {
          const booked = res.data
            .filter(seat => seat.isAvailable === false)
            .map(seat => parseInt(seat.seatNumber))
          setBookedSeats(booked)
        } else {
          console.error('Expected array but got:', res.data)
        }
      } catch (err) {
        console.error('Error fetching booked seats:', err)
      }
    }

    if (tripId) fetchSeats()
  }, [tripId])

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber))
    } else {
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seatNumber])
      } else {
        alert('You can only select up to 10 seats.')
      }
    }
  }

  const renderSeats = () => {
    let seats = []
    for (let i = 1; i <= totalSeats; i++) {
      seats.push(
        <Seat
          key={i}
          seatNumber={i}
          isSelected={selectedSeats.includes(i)}
          isBooked={bookedSeats.includes(i)}
          onClick={() => handleSeatClick(i)}
        />
      )
    }
    return seats
  }

  const seats = renderSeats()

  return (
    <div className="space-y-5">
      <h2 className="text-xl text-neutral-800 dark:text-neutral-100 font-medium">
        Choose a Seat
      </h2>

      <div className="w-full flex justify-between">
        <div className="flex-1 w-full flex">
          <div className="w-full flex-1 flex gap-x-5 items-stretch">
            <div className="w-10 h-full border-r-2 border-dashed border-neutral-300 dark:border-neutral-800">
              <GiSteeringWheel className="text-3xl mt-6 text-violet-600" />
            </div>

            <div className="flex flex-col items-center">
              <div className="w-full grid grid-cols-10 gap-x-3">{seats.slice(0, 10)}</div>
              <div className="w-full grid grid-cols-10 gap-x-3">{seats.slice(10, 20)}</div>
              <div className="w-full grid grid-cols-10 gap-x-3">
                <div className="col-span-9" />
                {seats.slice(20, 21)}
              </div>
              <div className="w-full grid grid-cols-10 gap-x-3">{seats.slice(21, 31)}</div>
              <div className="w-full grid grid-cols-10 gap-x-3">{seats.slice(31, 40)}</div>
              <div className="w-full grid grid-cols-10 gap-x-3">{seats.slice(40)}</div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="space-y-3 w-28">
          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-neutral-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Available</p>
          </div>
          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-red-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Booked</p>
          </div>
          <div className="flex items-center gap-x-2">
            <MdOutlineChair className="text-lg text-violet-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Selected</p>
          </div>
          <div className="flex items-center gap-x-2">
            <RiMoneyRupeeCircleLine className="text-lg text-neutral-500 -rotate-90" />
            <p className="text-neutral-900 dark:text-neutral-200 text-sm font-normal">Price</p>
          </div>
        </div>
      </div>

      {/* Selected Seats */}
      {selectedSeats.length > 0 && (
        <div className="!mt-10">
          <h3 className="text-lg font-bold">Selected Seats:</h3>
          <div className="flex flex-wrap">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="w-10 h-10 rounded-md m-1.5 text-lg font-medium bg-violet-600/30 flex items-center justify-center"
              >
                {seat}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default BusSeatLayout
