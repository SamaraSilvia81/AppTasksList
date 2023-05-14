import React, { useState } from "react";

import { ActivityIndicator } from "react-native";

import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, IconButton, Text } from 'react-native-paper';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CardTask } from "../components/CardTask";
import { getTasks, createTask, updateTask, deleteTask } from "../api/task";

export const TaskScreen = ({ navigation }) => {

  const queryClient = useQueryClient();

  // State para armazenar o texto do input
  const [newTaskText, setNewTaskText] = useState('');
  const [sucessMessage, setSucessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    }
  });

   // Mutation para criar uma nova tarefa
   const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      // Invalidar a query de tarefas e refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Limpar o texto do input
      setNewTaskText('');
    },
  });

   // Mutation para deletar uma tarefa
   const deleteTaskMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      // Invalidar a query de tarefas e refetch
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const handleNewTaskTextChange = (text) => {
    setNewTaskText(text);
  };

  const handleCreateTask = () => {
    if (newTaskText.trim() !== '') {
      createTaskMutation.mutate({ description: newTaskText });
      setSucessMessage('Item adicionado com sucesso!');
      setTimeout(() => {
        setSucessMessage('');
      }, 800);
    }
  };  

  const handleDeleteTask = (objectId, description) => {
    deleteTaskMutation.mutate(objectId);
    setSucessMessage(`O item "${description}" foi removido com sucesso!`);
    setTimeout(() => {
      setSucessMessage('');
    }, 800);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {isFetching && <Text>IS FETCHING</Text>}
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      {sucessMessage && <Text style={styles.sucess}>{sucessMessage}</Text>}

      <View style={styles.header}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.background}>
          <Text style={styles.span}>List</Text>
        </View>
      </View>
      <View style={styles.sectionInput}>
        <TextInput
          style={styles.input}
          onChangeText={handleNewTaskTextChange}
          value={newTaskText}
          keyboardType={'text'}
          textAlign={'center'}
        />
        <View style={styles.btnAdd}>
          <IconButton
            icon="plus"
            size={20}
            iconColor="#fff"
            onPress={handleCreateTask}
          />
        </View>
      </View>
     <FlatList
        style={{ flex: 1 }}
        data={data.results}
        keyExtractor={(item) => item.objectId}
        renderItem={({ item }) => (
          <CardTask
            task={item}
            navigation={navigation}
            taskDoneChange={mutation.mutate}
            onDeletePress={(objectId, description) => handleDeleteTask(objectId, description)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#fcfcfc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginLeft: 20,
    marginRight: 10,
    textAlign: 'center',
  },
  background: {
    paddingTop: 5,
    marginTop: 30,
    paddingLeft: 15,
    marginBottom: 30,
    paddingBottom: 5,
    paddingRight: 15,
    backgroundColor: '#5218e7',
  },
  span: {
    fontSize: 16,
    color: '#ffff',
  },
  sectionInput: {
    marginLeft: 30,
    marginBottom: 20,
    flexDirection: 'row',
  },
  input: {
    margin: 5,
    paddingTop: 5,
    width: 200,
    fontSize: 18,
    borderWidth: 1,
    textAlign: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
  },
  btnAdd: {
    margin: 5,
    padding: 15,
    borderRadius: 100,
    textAlign: 'center',
    backgroundColor: '#5218e7',
    transform: [{ scale: 0.8 }],
  },
  sucess: {
    padding: 5,
    marginBottom: 10,
    color: '#155724',
    textAlign: 'center',
    borderColor: '#c3e6cb',
    backgroundColor: '#d4edda',
  },
  error: {
    padding: 5,
    marginBottom: 10,
    color: '#721c24',
    textAlign: 'center',
    borderColor: '#f5c6cb',
    backgroundColor: '#f8d7da',
  }
});