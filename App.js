import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

import { setStatusBarBackgroundColor } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import Task from './components/task';



export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]); {/* default value is empty array*/}

  const handleAddTask = ()=>{
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]) /* [new array with tasks already in taskItems array and appends new task] */
    setTask(null); /* so that User input empties */
  }

  const completeTask = (index) => { /* takes in index of array */
    let itemsCopy = [...taskItems]; /* creates new array with everything in Task items into itemsCopy */
    itemsCopy.splice(index, 1); /* removes the one item from array andd store the result back in itemsCopy*/
    setTaskItems(itemsCopy) /* set state to itemsCopy */
  }
  

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >
      {/*/Today's Tasks/*/}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Edith's tasks for Today</Text>
        <View style={styles.items}>
          {/*This is where the tasks will go*/}
          {
            taskItems.map((item,index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      </ScrollView>

      {/*Write a Task*/}
      <KeyboardAvoidingView
        behavior = {Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'}value={task} onChangeText={text=>setTask(text)}/>
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
    tasksWrapper: {
      paddingTop: 80,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24, 
      fontWeight: 'bold'
    },
    items:{
      marginTop:30,
    },
    writeTaskWrapper:{
      position: 'absolute',
      bottom: 60,
      width: '100%',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems: 'center',
    },
    input:{
      paddingVertical:15,
      paddingHorizontal:15,
      backgroundColor: '#FFF',
      borderRadius: 60,
      borderColor: '#C0C0C0',
      borderWidth:1, 
      width: 250,

    },
    addWrapper:{
      width: 60,
      height: 60, 
      backgroundColor:'#FFF',
      borderRadius:60,
      justifyContent:'center',
      alignItems:'center',
      borderColor: '#C0C0C0',
      borderWidth:1,
    
    },
    addText:{},
});
