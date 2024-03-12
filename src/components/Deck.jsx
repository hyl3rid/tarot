import { useRef, useState, useEffect, useCallback, useContext } from 'react'
import { Link } from 'react-router-dom'
import './Deck.css';
import './Reveal.css';
import deck from '../utils/deck.js'
import Modal from './Modal.jsx'
import Button from './Button.jsx'
import { CardContext, CardDispatchContext } from "../context/CardsProvider.jsx";

function Deck({numberOfSelectedCards}) {
  const flipCardRef = useRef([]);

  const {shuffledDeck, cardsSelected, selectedReversed} = useContext(CardContext);
  const {setShuffledDeck, setCardsSelected, setSelectedReversed} = useContext(CardDispatchContext);

  const [reveal, setReveal] = useState(false)
  const [threeCards, setThreeCards] = useState(false)
  const [celticCross, setCelticCross] = useState(false)
  const [drawOne, setDrawOne] = useState(false)
  const [reversed, setReversed] = useState([])
  const [shuffledCards, setShuffledCards] = useState(false)
  const [flippedCards, setFlippedCards] = useState([])
  const [disableShuffle, setDisableShuffle] = useState(false)

    const hideModals = () => {
        setShuffledCards(false)
        setReveal(false)
        setDisableShuffle(false)
    } 

  const hideCards = () => {
    flippedCards.map(item => item.className += " flip-card-clicked")
  }

  const flipCard = (index, isReversed) => {
    setFlippedCards([...flippedCards, flipCardRef.current[index]])
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
        const shuffled = array.sort(() => Math.random() - 0.5)
        return shuffled; 
    }, []); 

    const generateFlippedCards = () => {
        const arr = [...new Array(78)].map(() => Math.round(Math.random()))
        setReversed(arr)
    }

    useEffect(() => {
        setCardsSelected([])
        setSelectedReversed([])
    }, [setCardsSelected, setSelectedReversed])
    
    useEffect(() => {
        setShuffledDeck(shuffle(deck))
    }, [shuffle, setShuffledDeck])

    useEffect(() => {
        if (numberOfSelectedCards === 3) {
            setThreeCards(true)
        } else if (numberOfSelectedCards === 10) {
            setCelticCross(true)
        } else if (numberOfSelectedCards === 1) {
            setDrawOne(true)
        }
    }, [numberOfSelectedCards])

    useEffect(() => {
        if (cardsSelected.length === numberOfSelectedCards) {
            setDisableShuffle(true)
        }
    }, [cardsSelected, numberOfSelectedCards])

    useEffect(() => {
        localStorage.setItem('shuffledDeck', JSON.stringify(shuffledDeck));
        localStorage.setItem('cardsSelected', JSON.stringify(cardsSelected));
        localStorage.setItem('selectedReversed', JSON.stringify(selectedReversed));
    }, [shuffledDeck, cardsSelected, selectedReversed])

  return (
    <div className="deck__container">
        <h1 className="deck__title">Pick your cards!</h1>
        <p className="deck__description">Take some time to select the cards you feel more attracted to and think about the question at hand. This will help obtain a more accurate result on the reading.</p>
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
        </div>
        <div className="deck__button-container">
            <div onClick={disableShuffle ? () => {} : () => {
                    hideCards()
                    shuffle(shuffledDeck)
                    setShuffledCards(true);
                    setFlippedCards([])
                    setCardsSelected([])
                    setReversed([])
                }}>
                <Button>Shuffle Cards</Button>
            </div>
            <Link to={`/`} className="deck__return-home"><Button>Return Home</Button></Link>
        </div>

        <Modal reveal={shuffledCards} timeout={0}>
            <p onClick={hideModals} className="modal-exit">X</p>
            <p>Cards shuffled!</p>
        </Modal>

        <Modal reveal={reveal} timeout={2000}>
            <p onClick={hideModals} className="modal-exit">X</p>
            <p>You selected all the required cards. Let's continue to reveal the meaning!</p>
            <div className="deck__margin-20">
                <Link to={`/reveal`} state={{ cardsSelected, selectedReversed, threeCards, celticCross, drawOne }} aria-label="Reveal Meaning of Cards">
                    <Button>
                        Reveal Meaning
                    </Button>
                </Link>
            </div>
        </Modal>
    </div>
  );
}

export default Deck;
