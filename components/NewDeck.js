import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions/decks";

class NewDeck extends Component {
  state = {
    title: ""
  };

  handleChange = title => {
    this.setState({ title });
  };

  addDeck = () => {
    this.props.dispatch(handleAddDeck(this.state.title)).then(() => {
      this.props.navigation.navigate("Deck", { deckTitle: this.state.title });
      this.setState({ title: "" });
    });
  };

  render() {
    const { title } = this.state;

    return (
      <ScrollView>
        <View>
          <Text style={styles.deckTitle}>Add Deck</Text>
          <TextInput
            style={styles.deckInput}
            placeholder="Enter a title"
            value={title}
            onChangeText={this.handleChange}>   
          </TextInput>
          <TouchableOpacity onPress={this.addDeck} style={styles.deckBtn}>
            <Text style={{flex: 1, textAlign: 'center', padding: 15, fontSize: 15}}>Add Deck</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckTitle: {
    textAlign: "center",
    fontSize: 40,
    padding: 20
  },
  deckInput: {
    textAlign: "center",
    fontSize: 15,
    borderBottomWidth: 1
  },
  deckBtn: {
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
  }
});

export default connect()(NewDeck);
