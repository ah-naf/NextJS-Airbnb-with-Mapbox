import Image from 'next/image'
import React from 'react'
import { exploreDataType } from '../utils/type'

export default function SmallCard({ exploreData }: PropsType) {
  return (
    <div className="m-2 mt-5 flex transform cursor-pointer items-center space-x-4 rounded-xl transition duration-200 ease-out hover:scale-105 hover:bg-gray-100">
      <div className="relative h-16 w-16">
        <Image src={exploreData.img} layout="fill" className="rounded-lg" />
      </div>
      <div>
        <h2>{exploreData.location}</h2>
        <h3 className="text-gray-500">{exploreData.distance}</h3>
      </div>
    </div>
  )
}

interface PropsType {
  exploreData: exploreDataType
}
