import { useState } from 'react'
import ReactMapGL, { ViewStateChangeEvent, Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'
import { searchResultType } from '../utils/type'

export default function Map({ searchResults }: PropsType) {

    const [selectedLocation, setSelectedLocation] = useState<searchResultType | undefined>()

  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates)

  console.log(center)

  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    ...center,
    zoom: 11,
  })

  const handleMove = (e: ViewStateChangeEvent) => {
    setViewport({
      ...viewport,
      latitude: e.viewState.latitude,
      longitude: e.viewState.longitude,
      zoom: e.viewState.zoom,
    })
  }

  return (
    <ReactMapGL
      mapStyle={'mapbox://styles/ahnaf3011/cl2yuh2uo000616qiezbc55z5'}
      mapboxAccessToken={process.env.mapbox_key}
      {...viewport}
      onMove={(e) => handleMove(e)}
    >
      {searchResults.map((item, index) => (
        <div key={index}>
          <Marker longitude={item.long} latitude={item.lat} anchor="bottom">
            <p aria-label='push-pin' onClick={() => setSelectedLocation(item)} className='cursor-pointer text-lg animate-bounce'>📍</p>
          </Marker>
          {selectedLocation?.long === item.long ? (
              <Popup closeOnClick={true} onClose={() => setSelectedLocation(undefined)} latitude={item.lat} longitude={item.long}>{item.title}</Popup>
          ) : (false)}
        </div>
      ))}
    </ReactMapGL>
  )
}

interface PropsType {
  searchResults: searchResultType[]
}
