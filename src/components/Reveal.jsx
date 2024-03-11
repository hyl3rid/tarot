
import { useLocation, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react"
import './Reveal.css'
import Button from './Button'
import Modal from './Modal'
import HelpIcon from './HelpIcon.jsx'
import { CardContext, CardDispatchContext } from "../context/CardsProvider.jsx";

function Reveal() {
    const location = useLocation();
    let { threeCards, celticCross, drawOne } = location.state;

    const {shuffledDeck, cardsSelected, selectedReversed} = useContext(CardContext);
    const {setShuffledDeck, setCardsSelected, setSelectedReversed} = useContext(CardDispatchContext);

    const [reveal, setReveal] = useState(false)
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [upwardMeaning, setUpwardMeaning] = useState("")
    const [downwardMeaning, setDownwardMeaning] = useState("")
    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [reversed, setReversed] = useState("")
    const [renderSelected, setRenderSelected] = useState([])
    const [revealHelp, setRevealHelp] = useState(false)
    const [revealSummary, setRevealSummary] = useState(false)
    
    const revealModal = (image, title, reversed, position, description, upward, downward) => {
        setImage(image)
        setTitle(title)
        setPosition(position)
        setReveal(true)
        setReversed(reversed)
        setDescription(description)
        setUpwardMeaning(upward)
        setDownwardMeaning(downward)
    }

    const hideModal = () => {
        setReveal(false)
    } 

    const toggleModalSummary = () => {
        setRevealSummary(prev => !prev)
    } 

    const toggleHelp = () => {
        setRevealHelp(prev => !prev)
    }
    
    useEffect(() => {
        const shuffled = JSON.parse(localStorage.getItem('shuffledDeck'));
        const cards = JSON.parse(localStorage.getItem('cardsSelected'));
        const selected = JSON.parse(localStorage.getItem('selectedReversed'));
        if (shuffled && cards && selected) {
            setShuffledDeck(shuffled)
            setCardsSelected(cards)
            setSelectedReversed(selected)
        }

    }, [ setCardsSelected, setSelectedReversed, setShuffledDeck ]);

    useEffect(() => {
        setRenderSelected(cardsSelected.map((card) => {
            return shuffledDeck[card]
        }));
    }, [cardsSelected , shuffledDeck])
    
    return (
        <section className="reveal">
            <div className="reveal__spreads">
                {drawOne && renderSelected.length > 0 && (
                    <section class="draw-one__container">
                        <div class="draw-one__content">
                            <h1 className="reveal__title">Draw One Card</h1>
                            <img 
                            src={renderSelected[0].image} 
                            alt={renderSelected[0].title} 
                            className={`reveal-image three-cards ${selectedReversed[0] ? 'reversed' : ''}`} 
                            onClick={() => revealModal(
                                renderSelected[0].image, 
                                renderSelected[0].title, 
                                selectedReversed[0], 
                                "Yes/No", 
                                "Answers a single question from the querent.", 
                                renderSelected[0].upward, 
                                renderSelected[0].downward
                            )}
                            />
                        </div>
                        <Link to={`/`} className="reveal__return-home--three-cards" aria-label="Click here to Return Home"><Button>Return Home</Button></Link>
                    </section>
                )}
                {threeCards && renderSelected.length > 0 && (
                        <div className='three-cards__container'>
                            <h1 className="reveal__title">Three Cards Spread</h1>
                            <div className="three-cards__selected-cards">
                                <div className="three-cards__card-container">
                                <img 
                                    src={renderSelected[1].image} 
                                    alt={renderSelected[1].title} 
                                    className={`reveal-image three-cards ${selectedReversed[1] ? 'reversed' : ''}`} 
                                    onClick={() => revealModal(
                                        renderSelected[1].image, 
                                        renderSelected[1].title, 
                                        selectedReversed[1], 
                                        "Past Influences", 
                                        "Situations of the past the influenced the present.", 
                                        renderSelected[1].upward, 
                                        renderSelected[1].downward
                                    )}
                                />
                                </div>
                                <div className="three-cards__card-container">
                                    <img 
                                        src={renderSelected[0].image} 
                                        alt={renderSelected[0].title} 
                                        className={`reveal-image three-cards ${selectedReversed[0] ? 'reversed' : ''}`} 
                                        onClick={() => revealModal(
                                            renderSelected[0].image, 
                                            renderSelected[0].title, 
                                            selectedReversed[0], 
                                            "Present", 
                                            "Current situation the querent consults.", 
                                            renderSelected[0].upward, 
                                            renderSelected[0].downward
                                        )}
                                    />
                                </div>
                                <div className="three-cards__card-container">
                                    <img 
                                        src={renderSelected[2].image} 
                                        alt={renderSelected[2].title} 
                                        className={`reveal-image three-cards ${selectedReversed[2] ? 'reversed' : ''}`} 
                                        onClick={() => revealModal(
                                            renderSelected[2].image, 
                                            renderSelected[2].title, 
                                            selectedReversed[2], 
                                            "Possible Outcome", 
                                            "One of the possible scenarios that may happen.", 
                                            renderSelected[2].upward, 
                                            renderSelected[2].downward
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="reveal__btn-container">
                                <div onClick={toggleModalSummary}>
                                    <Button>See Summary</Button>
                                </div>
                                <Link to={`/`} className="reveal__return-home--three-cards" aria-label="Click here to Return Home"><Button>Return Home</Button></Link>
                            </div>
                        </div>
                    )}
                    
                {celticCross && renderSelected.length > 0 &&
                <div className="celtic-cross">
                    <h1 className="celtic-cross__title">Celtic Cross</h1>
                    <div className="celtic-cross__container">
                        <img 
                            src={renderSelected[0].image} 
                            alt={renderSelected[0].title} 
                            className={`reveal-image celtic-cross__card situation ${selectedReversed[0] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[0].image, 
                                renderSelected[0].title, 
                                selectedReversed[0], 
                                "Situation", 
                                "Overall situation on why the querent consults the Tarot.", 
                                renderSelected[0].upward, 
                                renderSelected[0].downward
                            )}
                        />
                        <img 
                            src={renderSelected[1].image} 
                            alt={renderSelected[1].title} 
                            className={`reveal-image celtic-cross__card cross-purpose ${selectedReversed[1] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[1].image, 
                                renderSelected[1].title, 
                                selectedReversed[1], 
                                "Cross Purpose", 
                                "Current factors that play against the querent to fulfill his goal.",
                                renderSelected[1].upward, 
                                renderSelected[1].downward
                            )}
                        />
                        <img 
                            src={renderSelected[2].image} 
                            alt={renderSelected[2].title} 
                            className={`reveal-image celtic-cross__card foundation ${selectedReversed[2] ? 'reversed' : ''}`} 
                            onClick={() => revealModal(
                                renderSelected[2].image, 
                                renderSelected[2].title, 
                                selectedReversed[2], 
                                "Foundation", 
                                "Past experiences that keep the querent from reaching his goals",
                                renderSelected[2].upward, 
                                renderSelected[2].downward
                            )}
                        />
                        <img 
                            src={renderSelected[3].image} 
                            alt={renderSelected[3].title} 
                            className={`reveal-image celtic-cross__card past-influences ${selectedReversed[3] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[3].image, 
                                renderSelected[3].title, 
                                selectedReversed[3], 
                                "Past Influences",
                                "Influences of the past that made the querent take this path",
                                renderSelected[3].upward, 
                                renderSelected[3].downward
                            )}
                        />
                        <img 
                            src={renderSelected[4].image} 
                            alt={renderSelected[4].title} 
                            className={`reveal-image celtic-cross__card future ${selectedReversed[4] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[4].image, 
                                renderSelected[4].title, 
                                selectedReversed[4], 
                                "Possible Future",
                                "Near future that may occur",
                                renderSelected[4].upward, 
                                renderSelected[4].downward
                            )}
                        />
                        <img 
                            src={renderSelected[5].image} 
                            alt={renderSelected[5].title} 
                            className={`reveal-image celtic-cross__card past ${selectedReversed[5] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[5].image, 
                                renderSelected[5].title, 
                                selectedReversed[5], 
                                "Past",
                                "The past of the querent",
                                renderSelected[5].upward, 
                                renderSelected[5].downward
                            )}
                        />
                        <img 
                            src={renderSelected[6].image} 
                            alt={renderSelected[6].title} 
                            className={`reveal-image celtic-cross__card self ${selectedReversed[6] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[6].image, 
                                renderSelected[6].title, 
                                selectedReversed[6], 
                                "Self", 
                                "How the querent feels about himself.",
                                renderSelected[6].upward, 
                                renderSelected[6].downward
                            )}
                        />
                        <img 
                            src={renderSelected[7].image} 
                            alt={renderSelected[7].title} 
                            className={`reveal-image celtic-cross__card environment ${selectedReversed[7] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[7].image, 
                                renderSelected[7].title, 
                                selectedReversed[7], 
                                "Environment", 
                                "External factors such as society, family and friends.",
                                renderSelected[7].upward, 
                                renderSelected[7].downward
                            )}
                        />
                        <img 
                            src={renderSelected[8].image} 
                            alt={renderSelected[8].title} 
                            className={`reveal-image celtic-cross__card hopes-fears ${selectedReversed[8] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[8].image, 
                                renderSelected[8].title, 
                                selectedReversed[8], 
                                "Hopes and Fears", 
                                "Expresses how the querent hopes for the situation to be or ideas that hold the querent back.",
                                renderSelected[8].upward, 
                                renderSelected[8].downward
                            )}
                        />
                        <img 
                            src={renderSelected[9].image} 
                            alt={renderSelected[9].title} 
                            className={`reveal-image celtic-cross__card outcome ${selectedReversed[9] ? 'reversed' : ''}`}
                            onClick={() => revealModal(
                                renderSelected[9].image, 
                                renderSelected[9].title, 
                                selectedReversed[9], 
                                "Outcome", 
                                "The result of all the circumstances.",
                                renderSelected[9].upward, 
                                renderSelected[9].downward
                            )}
                        />
                    </div>
                    <Link to={`/`} className="reveal__return-home" aria-label="Click here to Return Home"><Button>Return Home</Button></Link>
                </div>}
            </div>

            <div className="reveal__help-icon" onClick={toggleHelp}>
                <HelpIcon />
            </div>

            <Modal reveal={reveal}>
                <div className="reveal_modal-container">
                    <p onClick={hideModal} className="reveal__modal-exit">X</p>
                    <a href={`${image}`} aria-label={title} target="_blank" rel="noreferrer">
                        <img src={image} alt={title} className={`reveal-image ${reversed ? 'reversed' : ''}`} />
                    </a>
                    <h2 className="reveal__modal-title">{title}</h2>
                    <h3>{position}</h3>
                    {description && (
                        <p className="reveal__modal-description">{description}</p>
                    )}
                    <p>Card Meaning: {reversed ? downwardMeaning : upwardMeaning}</p>
                </div>
            </Modal>

            <Modal reveal={revealSummary}>
                <div className="reveal_modal-container">
                    <p onClick={toggleModalSummary} className="reveal__modal-exit">X</p>
                    {cardsSelected.map((selected, index) => {
                        console.log(shuffledDeck[selected])
                        return (
                            <>
                                <a href={`${shuffledDeck[selected]}`} aria-label={title} target="_blank" rel="noreferrer">
                                    <img src={image} alt={title} className={`reveal-image ${reversed ? 'reversed' : ''}`} />
                                </a>
                                <h2 className="reveal__modal-title">{title}</h2>
                                <h3>{position}</h3>
                                {description && (
                                    <p className="reveal__modal-description">{description}</p>
                                )}
                                <p>Card Meaning: {reversed ? downwardMeaning : upwardMeaning}</p>
                            </>
                        )
                    })}
                </div>
            </Modal>

            <Modal reveal={revealHelp}>
                <div className="reveal_modal-container">
                    <p onClick={toggleHelp} className="reveal__modal-exit">X</p>
                    <p>You can click on the images or tap them to see the meaning.</p>
                </div>
            </Modal>
        </section>
        
    );
}

export default Reveal;
