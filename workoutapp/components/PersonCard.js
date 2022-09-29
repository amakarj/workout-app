import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Card } from '@rneui/base';


const PersonCard = (props) => {

    return (
        <>
            <Card>
                <Card.Title>Your Profile</Card.Title>
                <Card.Divider />
                <View style={styles.user}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: 'https://www.drodd.com/images11/meme-faces14.png', }}
                    />
                </View>
                {props.person.map((person, i) => {
                    return (
                        <View key={i} style={styles.details}>

                            <Text style={styles.fonts}>Name: {person.Firstname} {person.Lastname}</Text>
                            <Text style={styles.fonts}>Location: {person.Location}</Text>
                            <Text style={styles.fonts}>Slogan: "{person.Slogan}"</Text>
                        </View>
                    );
                })}
            </Card>
        </>
    )

}

const styles = StyleSheet.create({
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
    },
    fonts: {
        marginBottom: 8,
    },
    details: {

        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
    user: {
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'column',
        marginBottom: 6,
    },
});

export default PersonCard;