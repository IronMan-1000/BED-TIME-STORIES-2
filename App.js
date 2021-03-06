import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  ActivityIndicator ,
  Image,
  FlatList,
  
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import firebase from './config';
import { Appbar } from 'react-native-paper';
import {
  Ionicons,
  AntDesign,
  SimpleLineIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {SearchBar} from 'react-native-elements';

const image = { uri: "https://raw.githubusercontent.com/IronMan-1000/STORY-HUB-IMAGES/main/2f1c605195fe12118930d64d4137984e.jpg" };

function Read() {
 constructor(){
   super();
   this.state ={
     allStories:[],
     dataSource:[],
     search: ''
   };
 };
componentDidMount(){
  this.retriveStories()
};
updateSearch = search => {
  this.setState({search});
};

retriveStories=()=>{
  try{
    var allStories =[]
    var stories = db.collection("Stories")
    .get().then((querySnapshot)=> {
      querySnapshot.forEach((doc)=> {
        allStories.push(doc.data())
        console.log('this are the stories', allStories)
      })
      this.setState({allStories})
    })
  }
  catch (error){
    console.log(error);
  }
};

  SearchFilterFunction(text) {
    const newData = this.state.allStories.filter((item) => {
      const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexof(textData)> -1;
    });
    this.setState({
      dataSource: newData,
      search: text,
    });
  };

  return (
    <ScrollView >
      <View style={styles.container}>
     
      <ImageBackground source={image} style={styles.image}>
        <Appbar.Header style={{ backgroundColor: 'yellow' }}>
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
            title="????BED TIME STORIES????"
          />
      
        </Appbar.Header>
         
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>  
            <SearchBar
                  style={{
                    padding: 10,
                    width: 280,
                    borderWidth: 5,
                    borderRadius: 10,
                    marginTop: 500,
                    backgroundColor: 'blue',
                    borderColor: 'green'
                  }}
                  placeholder="PLEASE SEARCH HERE"
                  placeholderTextColor="yellow"
                  onChangeText={text => this.SearchFilterFunction(text)
                  }
                  onClear={text => this.SearchFilterFunction('')}
                  value={this.state.search}
                  
                />
          {selectedItems.map((val) => {
            return (
              <View style={{ marginTop: 10, textAlign: 'justify' }}>
               
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: 5,
                    marginTop:10,
                  }}>
                  {val.name}
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    textAlign: 'center',
                  }}>
                  {val.story}
                  <AntDesign
                    name="delete"
                    size={24}
                    style={{ paddingLeft: 10, marginTop: 5 }}
                    color="black"
                    onPress={() => Deeleete(val.id)}
                  />
                </Text>
              </View>
            );
          })}
        </View>
        <FlatList
        data={this.state.search === "" ? this.state.allStories: this.state.dataSource}
        renderItem={({item})=>(
          <View style={styles.itemContainer}>
          <Text> Title: {item.title}</Text>
          <Text> Author: {item.author}</Text>
          </View>
        )}
        keyExtractor={(item,index)=> index.toString()}
        />
        </ImageBackground>
        
      </View>
    </ScrollView>
  );
}
class Home extends React.Component {
  render() {
  return (
   <View style={styles.container}>
  
      <ImageBackground source={image} style={styles.image}>
        <Appbar.Header style={{ backgroundColor: 'yellow' }}>
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center' }}
            title="????BED TIME STORIES????"
          />
    
        </Appbar.Header>
         <Image
         style={styles.tinyLogo1}
          source={require('../assets/pic.jpg')}
         />
         <Text style={styles.name}>SAGNIK BISWAS</Text>
         <Text style={styles.intro}>MY NAME IS SAGNIK BISWAS. I LIKE TO CODE. MY HOBBIES ARE TO DO ART & CRAFT, PLAY FOOTBALL AND DO SKATING. CHECHOUT MY BED TIME STORY APP. THERE ARE TONS OF STORIES TO READ. YOU CAN ALSO WRITE A STORY FOR OTHERS AND MAKE PEOPLE HAPPY!!!????</Text>
      </ImageBackground>
     </View>
  );
 } 
}

class Write extends React.Component {
  state = {
    text: '',
    name: '',
  };
  pressed = () => {
    if (this.state.text.length > 10 && this.state.name !== '') {
      const db = firebase.firestore();
      db.collection('Writing').add({
        story: this.state.text.toUpperCase().trim(),
        name: this.state.name.toUpperCase().trim(),
      });
      alert('Added');
      this.props.navigation.navigate('Home');
      this.setState({
        text: '',
        name: '',
      });
    } else {
      alert('THERE SHOULD BE MINIMUM 10 LETTERS!!');
    }
  };

  render() {
    return (
      <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Appbar.Header style={{ backgroundColor: 'yellow' }}>
          <Appbar.Content
            style={{ display: 'flex', alignItems: 'center' }}
            title="????BED TIME STORIES????"
          />
        </Appbar.Header>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TextInput
            style={{
              padding: 10,
              width: 280,
              borderWidth: 1,
              borderRadius: 5,
              marginBottom: 10,
               borderColor: 'blue'
            }}
            placeholder="NAME OF THE STORY"
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
            placeholderTextColor="red"
          />
          <TextInput
            style={{
              padding: 10,
              width: 280,
              height: 300,
              borderWidth: 1,
              borderRadius: 5,
              borderColor: 'blue'
            }}
            placeholder="WRITE A STORY"
            value={this.state.text}
            onChangeText={(text) => this.setState({ text })}
             multiline={true}
             placeholderTextColor="red"
          />

          <TouchableOpacity
            style={{
              width: '50%',
              height: 55,
              alignSelf: 'center',
              padding: 10,
              margin: 10,
            }}
            onPress={this.pressed}>
            <Text
              style={{
                 textAlign: 'center',
                 fontSize: 30,
                 fontWeight: 'bold',
                 color: 'green'
              }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
    );
  }
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
     <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <AntDesign name="home" size={24} color="#483D8B" />,
        }}
      />
     <Tab.Screen
        name="Write"
        component={Write}
        options={{
          tabBarLabel: 'Write a Story',
          tabBarIcon: () => (
            <FontAwesome name="pencil" size={24} color="#483D8B" />
          ),
        }}
      />
     
       <Tab.Screen
        name="Read"
        component={Read}
        options={{
          tabBarLabel: 'Read a Story',
          tabBarIcon: () => <AntDesign name="book" size={24} color="#483D8B" />,
        }}
      />
     
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
 image: {
    flex: 1,
    resizeMode: "fill",
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor:'#ffffff'
  },
   tinyLogo1: { 
    marginTop: 50,
    width: 200,
    height: 250,
    marginLeft: 70,
  },
   intro : {
    textAlign : 'center',
    color: 'blue',
        fontWeight: 'bold',
        fontFamily: 'JokerMan',
        fontSize: 20,
        fontColor: 'blue'
  },
 name : {
    textAlign : 'center',
    color: 'red',
        fontWeight: 'bold',
        fontFamily: 'JokerMan',
        fontSize: 20,
        fontColor: 'red'
  }
});
