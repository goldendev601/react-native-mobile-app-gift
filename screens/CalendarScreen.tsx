import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, Image, Text, Pressable } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { View } from '../components/Themed';
import CalendarPicker from 'react-native-calendar-picker';
import { Moment } from 'moment';
import { setDateInfo } from '../actions/giftAppAction';

interface ICalendarScreenProps {
    navigation: NavigationProp<any>;
}

const CalendarScreen: React.FC<ICalendarScreenProps> = (props) => {
    const dispatch = useDispatch();

    const [startDate, setStartDate] = React.useState('2022-01-01'); 

    const onDateChange = (date: Moment) => {
        setStartDate(date.format('YYYY-MM-DD'))
    };

    const gotoAddNewEvent = () => {
        dispatch(setDateInfo(startDate));
        props.navigation.navigate('AddNewEventScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <CalendarPicker
                    onDateChange={onDateChange}
                />
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.sendButton} onPress={gotoAddNewEvent}>
                    <Text style={styles.sendButtonText}>Set Date</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 30,
        maxHeight: '75%',
        marginTop: 'auto',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 50,
        margin: 0,
        left: '50%',
        transform: [{
            translateX: -125        
        }],
        backgroundColor: 'transparent'
    },
    mainContainer: {
        width: '100%',
        marginTop: 21,
        height: 400
    },
    sendButtonText: {
        textTransform: "uppercase",
        paddingHorizontal: 20,
        color: "#FFF"
    },
    sendButton: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#7B61FF",
        fontSize: 15,
        fontWeight: "700",
        height: 50,
        borderRadius: 14,
        width: 250,
    },

});

export default CalendarScreen;
