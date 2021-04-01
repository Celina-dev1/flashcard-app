import React, { Fragment } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../components/DeckList";
import ViewDeck from "../components/ViewDeck";
import StudyDeck from "../components/StudyDeck";
import CreateDeck from "../components/CreateDeck";
import {Switch, Route} from "react-router-dom";
import AddCard from "../components/AddCard";
import EditDeck from "../components/EditDeck";
import EditCard from "../components/EditCard";

function Layout() {

  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path="/">
            <DeckList />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId">
            <ViewDeck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
}

export default Layout;
