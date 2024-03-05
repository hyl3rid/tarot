
import { useLocation, Link } from "react-router-dom";
import { useState } from "react"
import './Reveal.css'
import deck from '../utils/deck.js'
import Button from './Button'
import Modal from './Modal'

function Reveal() {
    const location = useLocation();
    const { cardsSelected, threeCards, celticCross, selectedReversed } = location.state;

    const [reveal, setReveal] = useState(false)
    const [image, setImage] = useState("")
    const [title, setTitle] = useState("")
    const [position, setPosition] = useState("")
    const [description, setDescription] = useState("")
    const [reversed, setReversed] = useState("")
    
    const revealModal = (image, title, reversed, position, description) => {
        setImage(image)
        setTitle(title)
        setPosition(position)
        setReveal(true)
        setReversed(reversed)
        setDescription(description)
    }

    const hideModal = () => {
        setReveal(false)
    }


    const renderSelected = cardsSelected.map((card) => {
        return deck[card]
    });

    return (
        <section className="reveal">
            <div className="reveal__spreads">
                {threeCards && (
                        <div className='three-cards__container'>
                            <h3 className="three-cards__title">Three Cards Spread</h3>
                            <div className="three-cards__selected-cards">
                                <div className="three-cards__card-container">
                                    <img src={renderSelected[1].image} alt={renderSelected[1].title} className={`reveal-image three-cards ${selectedReversed[1] ? 'reversed' : ''}`} />
                                    <p>Past Influences / {renderSelected[1].title}</p>
                                </div>
                                <div className="three-cards__card-container">
                                    <img src={renderSelected[0].image} alt={renderSelected[0].title} className={`reveal-image three-cards ${selectedReversed[0] ? 'reversed' : ''}`} />
                                    <p>Present / {renderSelected[0].title}</p>
                                </div>
                                <div className="three-cards__card-container">
                                    <img src={renderSelected[2].image} alt={renderSelected[2].title} className={`reveal-image three-cards ${selectedReversed[2] ? 'reversed' : ''}`} />
                                    <p>Possible Outcome / {renderSelected[2].title}</p>
                                </div>
                            </div>
                            <Link to={`/`} className="reveal__return-home--three-cards"><Button>Return Home</Button></Link>
                        </div>
                    )}
                    
                {celticCross && 
                <div className="celtic-cross">
                    <h2 className="celtic-cross__title">Celtic Cross</h2>
                    <div className="celtic-cross__container">
                        <img 
                            src={renderSelected[0].image} 
                            alt={renderSelected[0].title} 
                            className={`reveal-image celtic-cross__card situation ${selectedReversed[0] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[0].image, renderSelected[0].title, selectedReversed[0], "Situation", "Overall situation on why the querent consults the Tarot.")}
                        />
                        <img 
                            src={renderSelected[1].image} 
                            alt={renderSelected[1].title} 
                            className={`reveal-image celtic-cross__card cross-purpose ${selectedReversed[1] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[1].image, renderSelected[1].title, selectedReversed[1], "Cross Purpose", "Current factors that play against the querent to fulfill his goal.")}
                        />
                        <img 
                            src={renderSelected[2].image} 
                            alt={renderSelected[2].title} 
                            className={`reveal-image celtic-cross__card foundation ${selectedReversed[2] ? 'reversed' : ''}`} 
                            onClick={() => revealModal(renderSelected[2].image, renderSelected[2].title, selectedReversed[2], "Foundation", "Past experiences that keep the querent from reaching his goals")}
                        />
                        <img 
                            src={renderSelected[3].image} 
                            alt={renderSelected[3].title} 
                            className={`reveal-image celtic-cross__card past-influences ${selectedReversed[3] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[3].image, renderSelected[3].title, selectedReversed[3], "Past Influences")}
                        />
                        <img 
                            src={renderSelected[4].image} 
                            alt={renderSelected[4].title} 
                            className={`reveal-image celtic-cross__card future ${selectedReversed[4] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[4].image, renderSelected[4].title, selectedReversed[4], "Possible Future")}
                        />
                        <img 
                            src={renderSelected[5].image} 
                            alt={renderSelected[5].title} 
                            className={`reveal-image celtic-cross__card past ${selectedReversed[5] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[5].image, renderSelected[5].title, selectedReversed[5], "Past")}
                        />
                        <img 
                            src={renderSelected[6].image} 
                            alt={renderSelected[6].title} 
                            className={`reveal-image celtic-cross__card self ${selectedReversed[6] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[6].image, renderSelected[6].title, selectedReversed[6], "Self", "How the querent feels about himself.")}
                        />
                        <img 
                            src={renderSelected[7].image} 
                            alt={renderSelected[7].title} 
                            className={`reveal-image celtic-cross__card environment ${selectedReversed[7] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[7].image, renderSelected[7].title, selectedReversed[7], "Environment", "External factors such as society, family and friends.")}
                        />
                        <img 
                            src={renderSelected[8].image} 
                            alt={renderSelected[8].title} 
                            className={`reveal-image celtic-cross__card hopes-fears ${selectedReversed[8] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[8].image, renderSelected[8].title, selectedReversed[8], "Hopes and Fears", "Express how the querent wishes the situation to end or ideas the hold the querent back.")}
                        />
                        <img 
                            src={renderSelected[9].image} 
                            alt={renderSelected[9].title} 
                            className={`reveal-image celtic-cross__card outcome ${selectedReversed[9] ? 'reversed' : ''}`}
                            onClick={() => revealModal(renderSelected[9].image, renderSelected[9].title, selectedReversed[9], "Outcome", "The result of all the circumstances.")}
                        />
                    </div>
                    <Link to={`/`} className="reveal__return-home"><Button>Return Home</Button></Link>
                </div>}
            </div>

            <Modal reveal={reveal}>
                <div className="reveal_modal-container">
                    <p onClick={hideModal} className="reveal__modal-exit">X</p>
                    <img src={image} alt={title} className={`reveal-image ${reversed ? 'reversed' : ''}`} />
                    <h2 className="reveal__modal-title">{title}</h2>
                    <h3>{position}</h3>
                    {description && (
                        <p>{description}</p>
                    )}
                </div>
            </Modal>
        </section>
        
    );
}

export default Reveal;
