import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { setLocalNotification, clearLocalNotification } from "../utils/notifications";

class Quiz extends Component {
  state = {
    questionLength: 0,
    correct: [],
    incorrect: [],
    showAnswer: false,
    index: 1
  };

  componentDidMount() {
    const { deck } = this.props;
    this.setState({ questionLength: deck.questions.length });
  }

  handleAnswer = (answer, question) => {
    if (answer === true) {
      this.setState({
        correct: this.state.correct.concat([question]),
        index: this.state.index + 1,
        showAnswer: false
      });
    } else {
      this.setState({
        incorrect: this.state.incorrect.concat([question]),
        index: this.state.index + 1,
        showAnswer: false
      });
    }
  };

  restartQuiz = () => {
    const empty = [];
    this.setState({ index: 1, questionLength: 0, correct: empty, incorrect: empty });
    //clearLocalNotification().then(setLocalNotification);
  };

  toDeck = () => {
    this.restartQuiz();
    this.props.navigation.goBack();
  };

  setShowAnswer = () => {
    const { showAnswer } = this.state;

    this.setState({ showAnswer: !showAnswer });
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { correct, showAnswer, index } = this.state;

    let resultPercentage = Math.floor((correct.length / questions.length) * 100);

    return (
      <View>
        {index <= questions.length && (
          <View>
            <Text style={{padding: 30}}>
              {index}/{questions.length}
            </Text>
            <View>
              <Text style={styles.question}>{questions[index-1].question}</Text>
              {showAnswer && <Text style={styles.answer}>Answer: {questions[index-1].answer}</Text>}
              <TouchableOpacity onPress={this.setShowAnswer} style={styles.question}>
                {!showAnswer && <Text style={styles.question}>Show Answer</Text>}
                {showAnswer && <Text style={styles.question}>Hide Answer</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.handleAnswer(true, questions[index])} style={styles.quizBtn}>
                <Text>Correct</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.quizBtn} onPress={() => this.handleAnswer(false, questions[index])}>
                <Text>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {index > questions.length && (
          <View style={styles.quizComplete}>
            <Text>
              {correct.length} / {questions.length} ({resultPercentage}%) correct.
            </Text>
            <TouchableOpacity style={styles.quizBtn} onPress={this.restartQuiz}>
              <Text style={{padding: 5}}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quizBtn}  onPress={this.toDeck}>
              <Text style={{padding: 5}}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  quizComplete: {
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  quizBtn: {
    fontSize: 20,
    margin: 50,
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 5,
    alignContent: 'center'
  },
  question: {
    fontSize: 20,
    padding: 20,
    paddingLeft: 80
  },
  answer: {
    fontSize: 20,
    paddingLeft: 50
  },
  quizBtn: {
    fontSize: 20,
    padding: 10,
    margin: 50,
    height: 50,
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center'
  },
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck: decks[title]
  };
}

export default connect(mapStateToProps)(Quiz);
