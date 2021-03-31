//import { create } from "json-server";
import React, {Fragment, useState} from "react";
import { useHistory, Link } from "react-router-dom";
import {createDeck} from "../utils/api/index";

function CreateDeck() {
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');


    const handleNewDeck = (e) => {
       e.preventDefault();
       const newDeck = {name, description};
       async function update() {
           const response = await createDeck(newDeck);
           history.push(`/decks/${response.id}`);
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
                    Create Deck
                </li>
                
            </ol>
        </nav>
            <h2>Create Deck</h2>
            <form className="form-group" onSubmit={handleNewDeck}>
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                
                <label>Description</label>
                <textarea
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                
                <button 
                className="btn btn-secondary"
                onClick={() => history.push("/")}>Cancel</button>
                <button 
                className="btn btn-primary" 
                type="submit">
                    Submit
                </button>
            </form>
        </Fragment>
    )
}

export default CreateDeck;