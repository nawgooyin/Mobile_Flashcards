import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "./../actions/decks";

const decks = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };
    case ADD_DECK:
      const { title } = action;

      return {
        ...state,
        [title]: {
          title: title,
          questions: []
        }
      };
    case ADD_CARD:
      const { question, answer, name } = action.card;

      return {
        ...state,
        [name]: {
          ...state[name],
          questions: state[name].questions.concat([{ question, answer }])
        }
      };
    default:
      return state;
  }
};

export default decks;
