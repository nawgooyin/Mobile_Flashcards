export const RECEIVE_DECKS = "RECEIVE_DECKS";
export const RECEIVE_DECK = "RECEIVE_DECK";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

import { getDecks, saveDeck, getDeck, saveCard } from "./../utils/api";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}

export function receiveDeck(deck) {
  return {
    type: RECEIVE_DECK,
    deck
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function addCard(card) {
  return {
    type: ADD_CARD,
    card
  };
}

export function handleInitialData() {
  return dispatch => {
    return getDecks()
      .then(data => {
        dispatch(receiveDecks(JSON.parse(data)));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export function handleAddDeck(title) {
  return dispatch => {
    return saveDeck(title)
      .then(() => {
        dispatch(addDeck(title));
      })
      .catch(e => {
        console.error(e);
      });
  };
}

export function handleReceiveDeck(title) {
  return dispatch => {
    return getDeck(title)
      .then(data => {
        dispatch(receiveDeck(JSON.parse(data)));
      })
      .catch(e => console.error(e));
  };
}

export function handleAddCard(card) {
  return dispatch => {
    return saveCard(card)
      .then(() => {
        dispatch(addCard(card));
      })
      .catch(e => console.error(e));
  };
}
