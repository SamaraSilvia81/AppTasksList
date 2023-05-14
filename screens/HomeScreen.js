import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Button, Text } from "@rneui/themed";

export const HomeScreen = ({ navigation }) => {

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/samara-silvia-9a2a26231/');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Welcome To</Text>
          </View>
          <Button
            title="Tasks List"
            onPress={() => {
              navigation.navigate("Task");
            }}
            buttonStyle={{
              backgroundColor: '#5218e7',
              borderRadius: 5,
            }}
          />
        </View>
        <TouchableOpacity style={styles.footer} onPress={handleLinkedInPress}>
          <Text style={styles.text}>By SamaraSilvia</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    marginBottom: 15,
    textAlign: 'center',
  },
  text:{
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#5218e7',
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
  }
});
