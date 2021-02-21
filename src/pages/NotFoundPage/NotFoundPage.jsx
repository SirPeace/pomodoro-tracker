import React from "react"
import { Link } from "react-router-dom"

export default function NotFoundPage() {
  return (
    <div>
      <h1>404</h1>
      <h2>It seems like you got lost</h2>
      <Link to="/app">Get me back!</Link>
    </div>
  )
}
