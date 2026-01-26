export type Flight = {
  id: number
}

const FlightChip = ({flight}: {flight: Flight}) => {
  return (
    <div className='border border-black bg-[#E2F3F5] rounded-lg w-full h-14'>Flight Chip #{flight.id}</div>
  )
}

export default FlightChip