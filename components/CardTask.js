import { StyleSheet, View, Switch } from "react-native";
import { IconButton, Text } from 'react-native-paper';

export const CardTask = ({ task, taskDoneChange, onDeletePress  }) => {

  const handleChange = () => {
    taskDoneChange({ objectId: task.objectId, done: !task.done });
  };

  const handleDeleteTask = (objectId) => {
    onDeletePress(objectId,task.description);
  };

  return (
    <View style={styles.item}>
      <View style={styles.body}>
        <Text style={styles.titleItem}>
          {task.description} - {task.done ? "feita" : "a fazer"}
        </Text>
        <View style={styles.switch}>
          <Switch 
            value={task.done} 
            onValueChange={handleChange}
            trackColor={{false: '#B8B7B8', true: '#926DF0'}}
            thumbColor={task.done ? '#5218e7' : '#868487'}
          />
        </View>
      </View>
      <View style={styles.removeButtonContainer}>
        <IconButton
          icon="delete"
          iconColor="#fff"
          size={20}
          onPress={() => handleDeleteTask(task.objectId)}
          style={styles.removeButton}></IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    margin: 3,
    padding: 3,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    width: 200,
    padding: 15,
    borderRadius: 5,
    flexDirection: 'column',
    backgroundColor: '#eff0f1', // 8a63ef - f7f6f6 - b0b4b9 - eaeaec - eff0f1
    transform: [{ scale: 0.8 }],
  },
  titleItem: {
    fontSize: 20,
    marginBottom: 10,
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  switch: {
    height: 38,
    color: "#5218e7",
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  removeButtonContainer: {
    width: 40, // largura fixa
    marginRight: 35,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222', // #222
  },
  removeButton: {
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 0,
    backgroundColor: '#222', // #ff634
  },
});
