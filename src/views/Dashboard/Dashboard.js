import React from 'react'
import { useSelector } from 'react-redux'
function Dashboard() {
  const todoValue = useSelector(state => state.todo)
  console.log(todoValue)

  return (
    <div>
      <img src={'/images/flight.jpg'} className='img-fluid' />
    </div>
  )
}

export default Dashboard
