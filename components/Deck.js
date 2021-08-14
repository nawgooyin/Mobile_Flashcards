import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { deck } = this.props;
    const { title, questions } = deck;

    return (
      <View>
        <View style={styles.center}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.cardTitle}>
            {questions.length > 1 || questions.length < 1
              ? `${questions.length} Cards`
              : `${questions.length} Card`}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.deckBtn}
          onPress={() => this.props.navigation.navigate("NewCard", { title })}
        >
        <Text >Add Card</Text>
        </TouchableOpacity>

        {questions.length > 0 && (
          <TouchableOpacity
            style={styles.deckBtn}
            onPress={() => this.props.navigation.navigate("Quiz", { title })}
          >
          <Text >Start Quiz</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 30
  },
  cardTitle: {
    fontSize: 20,
    color: 'gray'
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  },
  deckBtn: {
    borderWidth: 1,
    padding: 10,
    margin: 20,
    alignItems: 'center'
  }
});

function mapStateToProps(decks, { navigation }) {
  const { deckTitle } = navigation.state.params;
  
  return {
    deck: decks[deckTitle]
  };
}

export default connect(mapStateToProps)(Deck);
