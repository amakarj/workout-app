import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ImageBackground,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {Card, Text, ListItem, Avatar, Image, Button} from '@rneui/themed';
import NavButtons from '../components/NavButtons';

const ViexExercises = props => {
  const [exerciseList, setExercise] = useState([
    // {exerciseid:1, movename: 'Biceps curl', movepic: require('../assets/benchpress.jpg'),checked:false},
    // {exerciseid:2, movename: 'Weight lift', movepic: require('../assets/weightlift.png'),checked:false}
  ]);

  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';

  useEffect(() => {
    if (isLoading) {
      fetchExercises();
      setLoading(false);
    }
  }, []);

  const fetchExercises = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readexercises',
      );
      let json = await response.json();

      setExercise(json);
      console.log('onko tämä json', json, ' ', exerciseList);
    } catch (error) {
      console.log(error);
    }
    console.log('mikä tämä on', exerciseList);
  };

  const saveExercisesToDb = async () => {
    console.log("tulostellaan listaa",exerciseList);
    console.log("ja taas",exerciseList.toString());

    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/updateexercises',
        {
          method:'PUT',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(exerciseList)
        });
        let json = await response.json();
        console.log(json);
    }
    catch (error) {
      console.log(error);
  }
  }

  keyExtractor = (item, index) => index.toString();

  const [checked, setChecked] = useState();
  const [id, setId] = useState(-1);
  const [exerciseToUpdate, updateExercise] = useState();
  const uri = require;
  const [visibility, setVisibility] = useState(false);

  const updateItem = index => {
    console.log(index);
    updateExercise(exerciseList[index]);
    exerciseList[index].checked = !exerciseList[index].checked;
    setExercise(exerciseList);
    console.log(exerciseList[index].checked);
    setChecked(!checked);
  };

  const openImage = index => {
    exerciseList[id].movepic;
    setExercise(exerciseList);
    setId(-1);
    setVisibility(true);
  };

  handleModalOpen = () => {
    setVisibility(true);
  };

  handleModalClose = () => {
    setVisibility(false);
  };
  const renderItem = ({item, index}) => {
    console.log('rivi 61', item.movepic);

    let path = imageurl + item.movepic;

    return (
      <ListItem bottomDivider key={index} style={styles.listitem}>
        {/* <TouchableOpacity> */}
        <Avatar
          source={{uri: path}}
          size={65}
          onPress={() => {
            handleModalOpen;
          }}
          avatarStyle={styles.avatar}
        />
        {/* <Modal
        open={visibility}
        onClose={handleModalClose}
        closeAfterTransition
      />
    </TouchableOpacity> */}

        <ListItem.Content style={styles.content}>
          <ListItem.Title style={{fontSize: 20, color: '#6533F9'}}>
            {item.movename}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.CheckBox
          checked={item.checked}
          uncheckedColor="#6533F9"
          checkedColor="#CB4FF4"
          onPress={() => {
            updateItem(index), item.checked;
          }}
        />
      </ListItem>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
        <View style={styles.flatlist}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              textAlign: 'center',
              fontWeight: '500',
              marginTop: 10,
              marginBottom: 7,
            }}>
            Choose exercises you want to add to your workout
          </Text>
          <FlatList
            keyExtractor={keyExtractor}
            data={exerciseList}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button buttonStyle={styles.button} title="START WORKOUT" onPress={()=>{saveExercisesToDb()}} />
            )}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottom}
      >
        <NavButtons params={props}/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#9F40E6',
    marginBottom: 20,
    borderRadius: 20,
    width: 200,
    height: 60,
    alignSelf: 'center',
  },
  flatlist: {
    flex: 8,
  },
  listitem: {
    padding: 5,
    marginTop: 5,
    
  },
  content: {
    padding: 25,
    
  },
  avatar: {
    resizeMode: 'contain',
  },
  bottom:{
    height:50
  }
});

export default ViexExercises;
