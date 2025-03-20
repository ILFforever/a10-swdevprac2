'use client'

import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Select, MenuItem } from '@mui/material'
import { Dayjs } from "dayjs"
import { useState, useEffect } from "react"

export default function DateReserve ({
  onDateChange, 
  onLocationChange, 
  initialVenue = ''
}:{
  onDateChange: Function,
  onLocationChange: Function,
  initialVenue?: string
}) {

  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null)
  const [location, setLocation] = useState(initialVenue)

  // Update location when initialVenue prop changes
  useEffect(() => {
    setLocation(initialVenue)
    if (initialVenue) {
      onLocationChange(initialVenue)
    }
  }, [initialVenue, onLocationChange])

  return (
    <div className="bg-white rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center shadow-md">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker className="bg-white text-black"
          value={reserveDate}
          onChange={(value) => {
            setReserveDate(value)
            if (value) onDateChange(value)
          }}
        />
      </LocalizationProvider>
      <Select 
        variant="standard" 
        name="location" 
        id="location" 
        value={location}
        displayEmpty
        onChange={(e) => {
          setLocation(e.target.value)
          onLocationChange(e.target.value)
        }}
        className="h-[2em] w-[200px] text-black"
      >
        <MenuItem value="" disabled>
          <em>Select a venue</em>
        </MenuItem>
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable">The Grand Table</MenuItem>
      </Select>
    </div>
  )
}