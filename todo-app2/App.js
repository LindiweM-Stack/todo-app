import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList,  Alert } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/MaterialIcons';





const COLORS = {primary: '#1F145C', white: '#FFF'}

const App = () => {
  const [textInput, setTextInput] = React.useState('');
  const [todos, setTodos] = React.useState([
   
  ]);

  const ListItem = ({todo}) =>{
    return(
      <View style={styles.listItem}>
    <View style={{flex: 1}}>
    <Text style={{
      fontWeight: 'bold',
       fontSize: '20', 
       color: '#1B3D12',textDecorationLine: todo?.completed?'line-through' : 'none',
       }}>
       {todo?.task}
       </Text>
       </View>
       {!todo?.completed && (

             <TouchableOpacity style={[styles.actionIcon]} onPress={() =>markTodoComplete(todo?.id)}>
       <Icon name="done" size={20} color="black"/>
       </TouchableOpacity>

       )}


         <TouchableOpacity style={[styles.actionIcon, {backgroundColor: 'teal'}]} onPress={()=>deleteTodo(todo?.id)}>
       <Icon name="delete" size={20} color={COLORS.white}/>

       </TouchableOpacity>


    </View>
    );

};

 const addTodo = () => {
     if (textInput == '') {
       Alert.alert('Error', 'Please input todo');
     } else {
     
  
   const newTodo = {
     id:Math.random(),
     task: textInput,
     completed: false,
   };
   setTodos([...todos, newTodo]);
   setTextInput('');
     }

 };

 const markTodoComplete = todoId =>{
  const newTodos = todos.map((item)=>{
    if(item.id == todoId) {
      return {...item,completed:true}

    }
    return item;

  });
  setTodos(newTodos);
 };

 const deleteTodo = (todoId) =>{
   const newTodos = todos.filter(item => item.id != todoId);
   setTodos(newTodos);
 };

  return( 
    
    <SafeAreaView style={{flex:1, backgroundColor: "steelblue"}}>
    <View style={styles.header}>
     <Text style={{fontWeight: 'bold', fontSize: 20, color: "", paddingLeft: 10}}>
     TODO APP
  </Text>
  

    </View>
    <FlatList 
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{padding: 20,paddingBottom: 100}}
    data={todos} 
    renderItem={({item}) => <ListItem todo={item}/>}

    />
    <View style={styles.footer}>
    <View  style={styles.inputContainer}>

    <TextInput placeholder="Add Todo" 
    value={textInput}
    onChangeText={(text)=>setTextInput(text)}/>

    </View>
<TouchableOpacity onPress={addTodo}>
<View style={styles.iconContainer}>
<Icon name="add"color='darkslategray' size={30}/>
</View>

</TouchableOpacity>
    </View>


  </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    borderRadius: 10,
    


  },

  listItem: {
    padding: 20,
    backgroundColor: 'turquoise',
    flexDirection: 'row',
    elevation: 12,
    borderRadius: 20,
    marginVertical: 10,
    borderWidth: 5,
    borderHeight: 10,
    borderColor: 'teal',

  },


  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    color: 'black',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 25,
  },


  inputContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: 'turquoise',
    borderRadius: 60,
    borderColor: 'teal',
    borderWidth: 5,
    width: 250,
   

  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: 'turquoise',
    borderRadius: 25,
    elevation: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'teal',

  }
});


export default App;
 
