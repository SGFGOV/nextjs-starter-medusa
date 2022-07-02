import Footer from "@modules/layout/templates/footer"
import Nav from "@modules/layout/templates/nav"
import React from "react"
import { SiteProps } from "types/global"

const Layout: React.FC<SiteProps|undefined> = ({ children }) => {
  return (
    <div>
      <Nav />
      <main className="min-h-[calc(100vh-64px)] relative">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
