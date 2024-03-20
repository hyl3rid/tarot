import deck from '../utils/deck.js'
import "./Meanings.css"
import { Link } from "react-router-dom";

function Meanings() {
    const backToTop = () => {
        window.scrollTo(0, 0)
    }

  return (
      <section className="meanings">
        <h1 className="meanings__title" id="beginning">Meanings of the Tarot cards</h1>
        <p className="meanings__text">Below are the descriptions of the different meanings for each card in the Major Arcana and Minor Arcana.</p>
        <div className="meanings__text">
            <div className="meanings__title">
                <Link to={`/`} className="meanings__links" aria-label="Click here to Return Home">Return Home</Link>
            </div>
            <ul>
                {deck.map((card,index) => {
                    return (
                        <li className="meanings__list">
                            <a href={`#${index}`} className="meanings__links" aria-label={`Link to card ${card.title}`}>{card.title}</a>
                        </li>
                    )
                })}
            </ul>
        </div>
        {deck.map((card, index) => {
            return (
                <div className="reveal__summary-container" key={index} id={index}>
                    <Link to={`${card.image}`} aria-label={card.title} target="_blank" rel="noreferrer">
                        <img src={card.image} alt={card.title} className="reveal-image" />
                    </Link>
                    <h2 className="reveal__modal-title">{card.title}</h2>
                    <p className="meanings__descriptions">{card.upward}</p>
                    <p className="meanings__descriptions">{card.downward}</p>
                    <span onClick={backToTop} className="meanings__back-top" aria-label="Click here to Return to the">Back to top</span>
                </div>
            )
        })}
      </section>
  );
}

export default Meanings;
