import './Board.css'
import Deck from './Deck.jsx';
import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";

function Board() {
    const location = useLocation();
    const { spread } = location.state;
    
    const [numCards, setNumCards] = useState(null)

    useEffect(() => {
        if (spread === 'celticCross') {
            setNumCards(10)
        } else if (spread === 'threeCards') {
            setNumCards(3)
        }
    }, [spread])

    return (
        <section className="board">
            <Deck numberOfSelectedCards={numCards}/>
        </section>
    );
}

export default Board;
