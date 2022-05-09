import { useRouter } from 'next/router'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { format } from 'date-fns'
import { searchResultType } from '../utils/type'
import InfoCard from '../components/InfoCard'

export default function Search({ searchResults }: PropsType) {
  const router = useRouter()
  let { location, startDate, endDate, noOfGuests } = router.query

  const formattedStartDate = format(new Date(startDate as string), 'dd MMMM yy')
  const formattedEndDate = format(new Date(endDate as string), 'dd MMMM yy')
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div className="">
      <Header placeholder={`${location} | ${range} | ${noOfGuests} guests`} />

      <main className="flex">
        <section className="flex-grow px-6 pt-14">
          <p className="text-xs">
            300+ Stays -- {range} -- for {noOfGuests} guests
          </p>
          <h1 className="mt-2 mb-6 text-3xl font-semibold">
            Stays in {location}
          </h1>

          <div className="mb-5 hidden space-x-3 whitespace-nowrap text-gray-800 lg:inline-flex">
            <p className="button">Cancellation Flexibility</p>
            <p className="button">Type of Place</p>
            <p className="button">Price</p>
            <p className="button">Rooms and Beds</p>
            <p className="button">More filters</p>
          </div>

          <div className='flex flex-col'> 
            {searchResults.map((item, index) => (
              <InfoCard key={index} searchResult={item} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const searchResults = await fetch('https://links.papareact.com/isz').then(
    (res) => res.json()
  )
  return {
    props: {
      searchResults,
    },
  }
}

interface PropsType {
  searchResults: searchResultType[]
}
