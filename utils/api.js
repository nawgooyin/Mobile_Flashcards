import { AsyncStorage } from "react-native";

export const MOBILE_FLASH_CARDS_KEY = "MobileFlashCardsssssss";

const initialData = { 
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
}

export function getDecks() {
  return AsyncStorage.getItem(MOBILE_FLASH_CARDS_KEY).then({initialData});
}

export function getDeck(title) {
  return AsyncStorage.getItem(MOBILE_FLASH_CARDS_KEY).then(results => results[title]);
}

export function saveDeck(title) {
  return AsyncStorage.mergeItem(
    MOBILE_FLASH_CARDS_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  );
}

export function saveCard({ question, answer, name }) {
  return AsyncStorage.getItem(MOBILE_FLASH_CARDS_KEY).then(results => {
    let decks = { ...JSON.parse(results) };
    decks = {
      ...decks,
      [name]: {
        ...decks[name],
        questions: decks[name].questions.concat([{ question, answer }])
      }
    };
    AsyncStorage.mergeItem(MOBILE_FLASH_CARDS_KEY, JSON.stringify(decks));
  });
}
