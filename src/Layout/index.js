import React, { Fragment, useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "../components/DeckList";
import ViewDeck from "../components/ViewDeck";
import StudyDeck from "../components/StudyDeck";
import CreateDeck from "../components/CreateDeck";
import {Switch, Route} from "react-router-dom";
import {listCards, listDecks} from "../utils/api/index";
import AddCard from "../components/AddCard";
import EditDeck from "../components/EditDeck";
import EditCard from "../components/EditCard";

function Layout() {
  //const [decks, setDecks] = useState([]);
  const [cards, setCards] = useState([]);

//   useEffect(() => {
//     const abortController = new AbortController();

//     async function loadDecks() {
//       const response = await listDecks(abortController.signal);
//       setDecks(response);
//     }

//     loadDecks();
//     return () => abortController.abort();
// }, []);

  // Handle getting new cards with a new deck id
  const handleDeckId = (deckId) => {
    const abortController = new AbortController();

    listCards(deckId, abortController.signal).then(setCards);

    return () => abortController.abort();
  };

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
