import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ImageBackground, Dimensions} from 'react-native';
import {Button, Text} from '@rneui/base';
import {Icon} from '@rneui/themed';
import Motivation from '../components/Motivation';
import NavButtons from '../components/NavButtons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {getCurrentDate} from '../components/Date.js';

const ViewStart = props => {
  const LOCAL_ADDRESS = 'http://10.0.2.2:8080';
  const SERVICE_ADDRESS = LOCAL_ADDRESS;
  const [isLoading, setLoading] = useState(true);
  const [person, setPerson] = useState([]);
  const [personId, setPersonId] = useState();

  const image = require('../assets/imageback.png');

  useEffect(() => {
    {props.navigation.setOptions({headerRight: () => (
      <Icon
        name="head-question"
        type="material-community"
        color="rgba(92, 99,216, 1)"
        size={25}
        onPress={() => props.navigation.navigate('Instructions')}
      />
    )})
  }
    if (isLoading) {
      // Fetching person information at first render
        fetchPerson();
        setLoading(false);
    }
}, [])

  //Fetching person id from database to send forward to other Views
  //Setting all person information to personList
  //Setting just persons id to personId > Used in ViewWorkoutHistory
  const fetchPerson = async () => {
    try {
      let response = await fetch(
        SERVICE_ADDRESS + '/rest/workoutservice/readperson',
      );
      let json = await response.json();

      setPerson(json);
      setPersonId(json[0].personid);
    } catch (error) {
      console.log(error);
    }
  };

  //BASE VIEW
  return (
    <View style={styles.container}>

      {/* Top of the screen with date and motivation box */}
      <View style={styles.top}>
        <ImageBackground
          source={require('../assets/imageback.png')}
          resizeMode="cover"
          style={styles.image}>
          
          <View style={styles.motivation}>
            <Text
            style={{
              color: 'white',
              fontSize: 17,
              textAlign: 'center',
              fontFamily:'OpenSans-SemiBold',
              paddingTop: 5,
              
            }}>

              {/* DATE */}
            {getCurrentDate()}
          </Text>

          {/* Motivation component from components folder */}
            <Motivation />
          </View>
        </ImageBackground>
      </View>

          {/* BUTTONS */}
      <View style={styles.buttonContainer}>
        
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkout />}
            buttonStyle={styles.button1}
            onPress={() => {
              props.navigation.navigate('Add Exercises', { personId: personId});
            }}></Button>
          <Button
            title={<CustomTitleAddMeas />}
            buttonStyle={styles.button2}
            onPress={() => {
              props.navigation.navigate('Add measurements', { person: person});
            }}></Button>
        </View>
        <View style={styles.buttongroup}>
          <Button
            title={<CustomTitleWorkoutHistory />}
            buttonStyle={styles.button3}
            onPress={() => {
              props.navigation.navigate('Workout History', {personId: personId});
            }}></Button>
          <Button
            title={<CustomTitleMeasHistory />}
            buttonStyle={styles.button4}
            onPress={() => {
              props.navigation.navigate('All recorded measurements', { person: person});
            }}></Button>
        </View>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottom}>

        <NavButtons params={props} />
        </View>
       
  
        
      </View>
    </View>
  );
};

//Custom buttons to get icon and title in different rows

//Start Workout button
const CustomTitleWorkout = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="weight-lifter"
        type="material-community"
        color="white"
        size={45}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 15,
          fontFamily:'OpenSans-SemiBold'
        }}>
        Start Workout
      </Text>
    </View>
  );
};

//Add Measurements button
const CustomTitleAddMeas = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="scale-bathroom"
        type="material-community"
        color="white"
        size={40}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          // fontWeight:'700',
          fontFamily:'OpenSans-SemiBold'
        }}>
        Add Measurements
      </Text>
    </View>
  );
};

//Workout History button
const CustomTitleWorkoutHistory = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon name="arm-flex" type="material-community" color="white" size={40} />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          fontFamily:'OpenSans-SemiBold'
        }}>
        Workout History
      </Text>
    </View>
  );
};

//Measurements History button
const CustomTitleMeasHistory = () => {
  return (
    <View style={{flexDirection: 'column'}}>
      <Icon
        name="chart-line"
        type="material-community"
        color="white"
        size={40}
      />
      <Text
        style={{
          fontSize: 15,
          color: 'white',
          marginTop: 10,
          textAlign: 'center',
          fontFamily:'OpenSans-SemiBold'
        }}>
        Measurements History
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    width:'100%'
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    height: '95%',
    width:Dimensions.get('window').width,
  },
  top: {
    flex: 2,
    alignItems: 'center',
  },
  motivation: {
    flex: 2,
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonContainer: {
    flex: 3,
    width:Dimensions.get('window').width,
    alignItems:'center'
  },
  buttongroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button1: {
    width: 150,
    height: 170,
    backgroundColor: '#4C40E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button2: {
    width: 150,
    height: 170,
    backgroundColor: '#7640E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button3: {
    width: 150,
    height: 170,
    backgroundColor: '#9F40E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  button4: {
    width: 150,
    height: 170,
    backgroundColor: '#C940E6',
    borderColor: 'transparent',
    borderRadius: 20,
    margin: 5,
  },
  bottom: {
    flex:1,
    width:Dimensions.get('window').width,
  }
});

export default ViewStart;
