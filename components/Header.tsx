import Image from 'next/image'
import React, { useState } from 'react'
import {
  GlobeAltIcon,
  MenuIcon,
  SearchIcon,
  UsersIcon,
  UserCircleIcon,
} from '@heroicons/react/solid'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker } from 'react-date-range'
import { RangeKeyDict } from 'react-date-range'
import { useRouter } from 'next/router'

export default function Header({placeholder}: PropsType) {
  const [searchInput, setSearchInput] = useState('')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())
  const [noOfGuests, setNoOfGuests] = useState(1)
  const router = useRouter()

  const selectionRange = {
    startDate,
    endDate,
    key: 'selection',
  }

  const handleSelect = (ranges: RangeKeyDict) => {
    setStartDate(ranges.selection.startDate)
    setEndDate(ranges.selection.endDate)
  }

  const search = () => {
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        noOfGuests,
      },
    })
  }

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-white p-5 shadow-md md:px-10">
      {/* Left */}
      <div
        onClick={() => router.push('/')}
        className="relative my-auto flex h-10 cursor-pointer items-center"
      >
        <Image
          src={'https://links.papareact.com/qd3'}
          layout="fill"
          objectFit="contain"
          objectPosition={'left'}
        />
      </div>

      {/* Middle */}
      <div className="flex items-center rounded-full py-2 md:border-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full bg-transparent pl-5 text-sm text-gray-600 placeholder-gray-400 outline-none"
          type="text"
          placeholder={placeholder || "Start your search"}
        />
        <SearchIcon className="hidden h-8 cursor-pointer rounded-full bg-red-400 p-2 text-white md:mx-2 md:inline" />
      </div>

      {/* Right */}
      <div className="flex items-center justify-end space-x-4 text-gray-500">
        <p className="hidden cursor-pointer lg:inline">Become a host</p>
        <GlobeAltIcon className="h-6" />
        <div className="flex items-center space-x-2 rounded-full border-2 p-2">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-6" />
        </div>
      </div>

      {searchInput && (
        <div className="col-span-3 mx-auto flex flex-col ">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={['#FD5B61']}
            onChange={(e) => handleSelect(e)}
          />

          <div className="mb-4 flex items-center border-b">
            <h2 className="flex-grow text-2xl font-semibold">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(parseInt(e.target.value))}
              type="number"
              min={1}
              className="w-12 pl-2 text-lg text-red-400 outline-none"
            />
          </div>
          <div className="flex items-center">
            <button
              onClick={() => setSearchInput('')}
              className="flex-grow text-gray-500"
            >
              Cancel
            </button>
            <button onClick={search} className="flex-grow text-red-400">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

interface PropsType {
  placeholder ?: string
}