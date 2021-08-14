import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { handleAddCard } from "../actions/decks";

class NewCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  addCard = () => {
    const title = this.props.navigation.getParam("title");
    const { question, answer } = this.state;

    this.props.dispatch(handleAddCard({ question, answer, name: title }));
    this.props.navigation.goBack();
  };

  render() {
    const { question, answer } = this.state;

    return (
      <View>
        <TextInput
          style={styles.cardInput}
          placeholder="Question"
          value={question}
          onChangeText={question => { this.setState({ question}) }}
        ></TextInput>
        <TextInput
          style={styles.cardInput}
          placeholder="Answer"
          value={answer}
          onChangeText={answer => { this.setState({ answer }) }}
        ></TextInput>
        <TouchableOpacity onPress={this.addCard} style={styles.cardBtn}>
          <Text>Add Card</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardInput: {
    textAlign: "center",
    fontSize: 20,
    borderBottomWidth: 1,
    padding: 20
  },
  cardBtn: {
    borderWidth: 1,
    padding: 20,
    margin: 20,
    alignItems: 'center'
  }
});

export default connect()(NewCard);
