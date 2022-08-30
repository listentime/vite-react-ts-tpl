import React from "react"
import { BrowserRouter } from "react-router-dom"
import RouterView from "./routerView"

const Router = ()=> {
  return  <BrowserRouter basename="xx">
      <RouterView />
    </BrowserRouter>
}
export default Router