import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'
import Modal from './Modal'
import Button from './Button'
import SVGLogo from './Logo'

function Home() {
    const [reveal, setReveal] = useState(false)
    
    const revealModal = () => {
        setReveal(true)
    }
    const hideModal = () => {
        setReveal(false)
    }

    return (
        <>
            <div className="home__main-app">
                <SVGLogo />
                <h1>Tarot Realms of Insight</h1>
                <p className="home__margin-20">This is a website where you can play different kinds of tarot spreads known for free.</p>
                <p className="home__margin-20">Following are the spreads available:</p>
                <ul>
                    <li>Three Card Spread</li>
                    <li>Celtic Cross</li>
                    <li>Draw one card</li>
                </ul>
                <p className="home__margin-20">Following are the ones that will be added in the future:</p>
                <ul>
                    <li>Pick the top card</li>
                    <li>Two Cards</li>
                    <li>Pick from the Major Arcana only</li>
                </ul>
                <div className="home__margin-20 home__play-button" onClick={revealModal}>
                    <Button>Play</Button>
                </div>
                <Modal reveal={reveal} timeout={0}>
                    <p className="modal-exit" onClick={hideModal}>X</p>
                    <h3 className="home__modal-title">Pick a Spread</h3>
                    <div className="home__modal-spreads">
                        <Link to={`/board`} className="home__modal-links" state={{ spread: 'drawOne' }} aria-label="Play the Draw One Card">One Card</Link>
                        <Link to={`/board`} className="home__modal-links" state={{ spread: 'threeCards' }} aria-label="Play the Three Card Spread">Three Cards</Link>
                        <Link to={`/board`} className="home__modal-links" state={{ spread: 'celticCross' }} aria-label="Play the Celtic Cross Spread">Celtic Cross</Link>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Home;
