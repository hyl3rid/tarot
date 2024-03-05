import { useRef, useState, useEffect, useCallback } from 'react'
import {Link} from 'react-router-dom'
import './Deck.css';
import deck from '../utils/deck.js'
import Modal from './Modal.jsx'
import Button from './Button.jsx'


function Deck({numberOfSelectedCards}) {
  const flipCardRef = useRef([]);

  const [cardsSelected, setCardsSelected] = useState([])
  const [reveal, setReveal] = useState(false)
  const [threeCards, setThreeCards] = useState(false)
  const [celticCross, setCelticCross] = useState(false)
  const [shuffledDeck, setShuffledDeck] = useState([])
  const [reversed, setReversed] = useState([])
  const [selectedReversed, setSelectedReversed] = useState([])

  const flipCard = (index, isReversed) => {
    if (cardsSelected.length < numberOfSelectedCards) {
        const currentCard = flipCardRef.current[index]
        if (currentCard.className.includes("flip-card-clicked")) {
          currentCard.className = "flip-card"
          setSelectedReversed([...selectedReversed, isReversed])
        } 
        if (!cardsSelected.includes(index)) {
            setCardsSelected([...cardsSelected, index])
        }

        if (cardsSelected.length === numberOfSelectedCards - 1) {
            setReveal(true)
        }
    }
  }

    const shuffle = useCallback((array) => { 
        generateFlippedCards()
        return array.sort(() => Math.random() - 0.5); 
    }, []); 

    const generateFlippedCards = () => {
        const arr = [...new Array(78)].map(() => Math.round(Math.random()))
        setReversed(arr)
    }
    
    useEffect(() => {
        setShuffledDeck(shuffle(deck))
    }, [shuffle])

    useEffect(() => {
        if (numberOfSelectedCards === 3) {
            setThreeCards(true)
        } else if (numberOfSelectedCards === 10) {
            setCelticCross(true)
        }
    }, [numberOfSelectedCards, setThreeCards])

  return (
    <div className="deck__container">
        <h2 className="deck__title">Pick your cards!</h2>
        <div className="all_cards">
            {shuffledDeck.map((item, index) => {  
                return (
                    <div className="total_card" key={index}>
                        <div className="flip-card flip-card-clicked" onClick={() => flipCard(index, reversed[index])} ref={el => flipCardRef.current[index] = el}>
                            <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img className={`card ${reversed[index] ? 'reversed' : ''}`} src={item.image} alt={item.title} />
                            </div>
                            <div className="flip-card-back"></div>
                            </div>
                        </div>
                    </div>
                )
            })}


            <Modal reveal={reveal} timeout={2500}>
                <p>You selected all the required cards. Let's continue to reveal the meaning!</p>
                <Link to={`/reveal`} state={{ cardsSelected, threeCards, celticCross, selectedReversed }}>
                    <Button>
                        Reveal Meaning
                    </Button>
                </Link>
            </Modal>
        </div>
        <Link to={`/`} className="deck__return-home"><Button>Return Home</Button></Link>
    </div>
  );
}

export default Deck;
