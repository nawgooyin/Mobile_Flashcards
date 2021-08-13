import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { setLocalNotification } from "./utils/notifications";

class App extends Component {
    componentDidMount() {
      setLocalNotification();
    }

    render() {
        return (
            <View style={styles.container}>
              <Text>hi</Text>
              <StatusBar style="auto" />
            </View>
          );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});


export default App;
