import React, {Fragment, useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {createCard, readDeck} from "../utils/api/index";
import CardForm from "./CardForm";

function AddCard() {
    const {deckId} = useParams();
    const [front, setFront] = useState('');
    const [back, setBack] = useState('');
    
    const [currentDeck, setCurrentDeck] = useState({});
    const [cards, setCards] = useState([]);

    useEffect(() => {
        async function loadCurrentDeck() {
            const response = await readDeck(deckId);
            setCurrentDeck(response);
            setCards(response.cards);
        }
        loadCurrentDeck();
    }, [deckId]);

    const handleNewCard = (e) => {
       e.preventDefault();
       const newCard = {front, back};
       async function update() {
        const response = await createCard(deckId,newCard);
        setCards([...cards, response])
        setFront('');
        setBack('');
       }
        update();
      }

    return (
        <Fragment>
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                    {currentDeck.name}
                </li>
                <li className="breadcrumb-item">
                    Add Card
                </li>
                
            </ol>
        </nav>
            <h2>Add Card</h2>
            <CardForm 
                handleNewCard={handleNewCard} 
                front={front} 
                setFront={setFront} 
                back={back} 
                setBack={setBack} 
            />
        </Fragment>
    )
}

export default AddCard;