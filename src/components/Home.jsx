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
                <h1>Tarot Realms</h1>
                <p>This is a website where you can play different kinds of tarot spreads known.</p>
                <div onClick={revealModal}>
                    <Button>Play</Button>
                </div>
                <Modal reveal={reveal} timeout={0}>
                    <p className="home__modal-exit" onClick={hideModal}>X</p>
                    <h3 className="home__modal-title">Pick a Spread</h3>
                    <div className="home__modal-spreads">
                        <Link to={`/board`} className="home__modal-links" state={{ spread: 'threeCards' }}>Three Cards</Link>
                        <Link to={`/board`} className="home__modal-links" state={{ spread: 'celticCross' }}>Celtic Cross</Link>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Home;
