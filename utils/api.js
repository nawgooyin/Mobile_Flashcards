export const MOBILE_FLASHCARD_KEY = "mobile_flashcard_key";

function getInitialData() {
    return {
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
}

export async function getDecks() {
    const results = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);
    
    if (results) {
        const data = JSON.parse(results);
        return data;
    } else {
        await AsyncStorage.setItem(
            MOBILE_FLASHCARD_KEY,
            JSON.stringify(getInitialData())
        );
        return getInitialData();
    }
}

export async function getDeck(title) {
    return await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY).then(results => results[title]);
}

export async function saveDeck(title) {
    const deck = {
      title: title,
      questions: []
    };
  
    await AsyncStorage.mergeItem(
        MOBILE_FLASHCARD_KEY,
        JSON.stringify({
            [title]: {
                title: title,
                questions: []
            }
        })
    );

    return deck;
  }
  
  export async function saveCard({ question, answer, name }) {
    const results = await AsyncStorage.getItem(MOBILE_FLASHCARD_KEY);

    if (results) {
      const decks = JSON.parse(results);

      decks = {
        ...decks,
        [name]: {
          ...decks[name],
          questions: decks[name].questions.concat([{ question, answer }])
        }
      };

      await AsyncStorage.mergeItem(
        MOBILE_FLASHCARD_KEY,
        JSON.stringify({
          decks
        })
      );

      return decks;
    }
  }