import React from 'react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <h1>Oops Something went wrong....</h1>
      <Link to='/'>Go to Dashboard</Link>
    </div>
  )
}

export default ErrorPage