import React from "react"
import { Link } from "react-router-dom"
import Page from "../Page"

export default function NotFoundPage() {
  return (
    <Page>
      <h1>404</h1>
      <h3>It seems like you got lost</h3>
      <Link to="/app">Get me back!</Link>
    </Page>
  )
}
