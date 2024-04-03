import React from 'react'
import { useParams } from 'react-router-dom'

export default function Login() {
  const {id} = useParams()
  return (
    <div>Login {id}</div>
  )
}
