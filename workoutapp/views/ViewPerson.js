import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ImageBackground } from 'react-native';
import { Icon, Button } from '@rneui/base';
import NavButtons from '../components/NavButtons';
import PersonCard from '../components/PersonCard';

const ViewPerson = (props) => {
    const LOCAL_ADDRESS = "http://10.0.2.2:8080";
    const SERVICE_ADDRESS = LOCAL_ADDRESS;
    const [isLoading, setLoading] = useState(true);
    const [person, setPerson] = useState([]);

    // first one to get instructions-page button to the header
    // second section for getting person details from a database
    useEffect(() => {
        {
            props.navigation.setOptions({
                headerRight: () => (
                    <Icon
                        name="head-question"
                        type="material-community"
                        color="rgba(92, 99,216, 1)"
                        size={25}
                        onPress={() => props.navigation.navigate('Instructions')}
                    />
                )
            })
        }
        if (isLoading) {
            fetchPerson();
            setLoading(false);
        }
    }, [])

    // method for fetching person details from database and adding this to person array with setPerson
    const fetchPerson = async () => {
        try {
            let response = await fetch(SERVICE_ADDRESS + "/rest/workoutservice/readperson");
            let json = await response.json();

            setPerson(json);

        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground
        source={require('../assets/imageback.png')}
        resizeMode="cover"
        style={styles.image}>
            <View style={styles.card}>
                {/* PersonCard component to which sending person details as a parameter */}
                <PersonCard person={person} />
            </View>
            <View style={styles.buttoncont}>
                {/* buttons to next views, person will be sent as a parameter */}
                <Button
                    buttonStyle={styles.button}
                    title='EDIT YOUR PROFILE'
                    onPress={() => { props.navigation.navigate('Edit profile', { person: person }) }}></Button>
                <Button
                    buttonStyle={styles.button}
                    title='CHECK YOUR MEASUREMENTS'
                    onPress={() => { props.navigation.navigate('All recorded measurements', { person: person }) }}></Button>

            </View>
            <View style={styles.buttonContainer}>
                <NavButtons params={props} />
            </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttoncont: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 50,
    },
    button: {
        marginRight: 5,
        marginTop: 0,
        backgroundColor: '#9F40E6',
        marginBottom: 10,
        borderRadius: 20,
        width: 150,
        height: 60,
    },
    card: {
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default ViewPerson;