import React, {Fragment, useState, useEffect} from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import {updateDeck, readDeck, listDecks} from "../utils/api/index";

function EditDeck() {
    
    const history= useHistory();
    const {deckId} = useParams();
    const [currentDeck, setCurrentDeck] = useState({});
    const [updatedName, setUpdatedName] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    
    useEffect(() => {
        async function loadCurrentDeck() {
            const response = await readDeck(deckId);
            setCurrentDeck(response);
            setUpdatedName(response.name);
            setUpdatedDescription(response.description);
        }
        loadCurrentDeck();
    }, [deckId]);


    const handleDeckUpdate = (e) => {
        e.preventDefault();
        const newDeck = {
            id: deckId, 
            name: updatedName, 
            description: updatedDescription
        };
        
        async function update() {
            await updateDeck(newDeck);
            history.push(`/`)
        }
        update();
       }


    return (
        <Fragment>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link className="btn btn-link" to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        {currentDeck.name}
                    </li>
                    <li className="breadcrumb-item">
                        Edit Deck
                    </li>
                    
                </ol>
            </nav>
            <h2>Edit Deck</h2>
            <form className="form-group" onSubmit={handleDeckUpdate}>
                <label>Name</label>
                <input 
                    className="form-control"
                    type="text" 
                    value={updatedName}
                    placeholder={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary"
                onClick={() => history.push(`/decks/${deckId}`)}>
                    Cancel
                </button>
                <button 
                className="btn btn-primary" 
                type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    )
}

export default EditDeck;