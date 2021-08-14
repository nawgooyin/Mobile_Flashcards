import React, { Component } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/decks";

class Decks extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  navToDeck = deck => {
    this.props.navigation.navigate("Deck", { deckTitle: deck.title });
  };

  render() {
    const { decks } = this.props;

    console.log('decks: ', decks);

    if (Object.keys(decks).length === 0) {
      return (
        <View>
          <Text style={styles.decksTitle}>Decks</Text>
          <View style={{flex: 1, alignItems: "center"}}>
            <Text style={styles.deckText}>
              Please add a deck to begin your quiz
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView>
        <View>
          <Text style={styles.decksTitle}>Decks</Text>
          <View style={styles.container}>
            {Object.keys(decks).map(deck => (
              <View style={styles.deck} key={deck}>
                <TouchableOpacity onPress={() => this.navToDeck(decks[deck])}>
                  <Text style={styles.deckText}>{decks[deck].title}</Text>
                  <Text style={styles.deckText}>
                    {decks[deck].questions.length > 1 || decks[deck].questions.length < 1
                      ? `${decks[deck].questions.length} Cards`
                      : `${decks[deck].questions.length} Card`}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );r
  }
}

const styles = StyleSheet.create({
  decksTitle: {
    textAlign: "center",
    fontSize: 40,
    padding: 20
  },
  deck: {
    borderColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 25,
    fontSize: 20,
    textAlign: "center",
    color: 'black',
  },
  deckText: {
    fontSize: 20,
    textAlign: "center"
  }
});

function mapStateToProps(decks) {
  return {
    decks
  };
}

export default connect(mapStateToProps)(Decks);
