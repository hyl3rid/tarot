import React, { createContext, useState } from "react";

// Create two context:
// UserContext: to query the context state
// UserDispatchContext: to mutate the context state
const CardContext = createContext(undefined);
const CardDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function CardProvider({ children }) {
    const [shuffledDeck, setShuffledDeck] = useState([])
    const [cardsSelected, setCardsSelected] = useState([])
    const [selectedReversed, setSelectedReversed] = useState([])

  return (
    <CardContext.Provider value={{ shuffledDeck, cardsSelected, selectedReversed }}>
      <CardDispatchContext.Provider value={{ setShuffledDeck, setCardsSelected, setSelectedReversed }}>
        {children}
      </CardDispatchContext.Provider>
    </CardContext.Provider>
  );
}

export { CardProvider, CardContext, CardDispatchContext };