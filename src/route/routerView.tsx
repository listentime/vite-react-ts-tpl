import React from "react"
import { Redirect, Route, RouteProps, Switch } from "react-router-dom"
import Article from "../pages/Article"
import ArticleList from "../pages/ArticleList"

function RouterView() {

    return <Switch>
        <Route component={Article} path="/" exact></Route>
        <Route component={ArticleList} path="/list" exact></Route>
    </Switch>
}

export default RouterView;