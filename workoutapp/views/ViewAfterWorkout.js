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

const ViewAfterWorkout = props => {
  const [workoutSummary, setWorkoutSummary] = useState([]);
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const imageurl = 'http://10.0.2.2:8080/images/';
  const [exerciseList, setExerciseList] = useState(props.route.params == undefined ? "" : props.route.params.exerciseList);
  const [exIds, setExsIds] = useState([]);
  const [workoutId, setWorkoutId] = useState(props.route.params == undefined ? "" : props.route.params.workoutExerciseList);
  const [workid, setWork] = useState();

  useEffect(() => {
    if (isLoading) {
      
      setLoading(false);
      collectExerciseNumbers();
      console.log("exerciseList",exerciseList);
      console.log("workoutid", workoutId);
      fetchWorkout();
    }

    
  }, []);

//  Colllecting exercise id's from exerciseList to exIds list
// for getting matching series from database
  const collectExerciseNumbers = () => {

    setWork(workoutId[0].workoutid);
    console.log("workoutid:", workid);
    for (let i = 0; i < exerciseList.length; i++) {
        let id = exerciseList[i].exerciseid;
        console.log("id:", id);
        exIds.push(id);
        console.log(exIds);
    }
  };

  const fetchWorkout = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readworkoutexercisesbyid/29',
      );
      let json = await response.json();

      setWorkoutSummary(json);
      //console.log('onko tämä json', json, ' ', workoutSummary);
    } catch (error) {
      console.log(error);
    }
  };


  keyExtractor = (item, index) => index.toString();

  
  const renderItem = ({item, index}) => {
    //console.log('rivi 61', item.picture);

    let path = imageurl + item.picture;

    return (
      <ListItem bottomDivider key={index} style={styles.listitem}>

        <ListItem.Content style={styles.content}>
          <ListItem.Title style={{fontSize: 20, color: '#6533F9'}}>
            {item.movename}
          </ListItem.Title>
          <ListItem.Subtitle>
            {item.reps}
            {item.weights}
            {item.duration}
          </ListItem.Subtitle>
        </ListItem.Content>
        
         <Avatar
          source={{uri: path}}
          size={65}
          onPress={() => {
            handleModalOpen;
          }}
          avatarStyle={styles.avatar}
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
            Your workout summary
          </Text>
          <FlatList
            keyExtractor={keyExtractor}
            data={workoutSummary}
            renderItem={renderItem}
            ListFooterComponent={() => (
              <Button
                buttonStyle={styles.button}
                title="DONE"
                // onPress={() => {
                //   saveExercisesToDb();
                // }}
              />
            )}
          />
        </View>
      </ImageBackground>
      <View style={styles.bottom}>
        <NavButtons params={props} />
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
    padding: 10,
  },
  avatar: {
    resizeMode: 'contain',
  },
  bottom: {
    height: 50,
  },
});


export default ViewAfterWorkout;