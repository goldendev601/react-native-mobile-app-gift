import React from "react"
import { StyleSheet, TouchableOpacity, Image, View } from "react-native"

const CustomCheckbox = (props: {
    option: any 
    value: any
    onChange: (value: any) => void
    position: 'top-right' | 'center'
    children: JSX.Element
}) => {
    return(
        <TouchableOpacity 
            onPress={() => {
                props.onChange(props.option)
            }}
            style={styles.customCheckBoxContainer}
        >
            {props.children}
            {
                props.option === props.value && (
                    <View style={[styles.checkContainer, props.position === 'center' ? styles.checkPositionCenter : styles.checkPositionTopRight]}>
                        <Image
                            source={require("../assets/images/checkmark.png")}
                            style={styles.iconImage}
                            resizeMode="cover"
                        />
                    </View>
                )
            }
        </TouchableOpacity>
    )
}

const styles =  StyleSheet.create({
    customCheckBoxContainer: {
        position: 'relative'
    },
    iconImage: {
        width: 30,
        height: 30
    },
    checkContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkPositionTopRight: {
        position: 'absolute',
        top: 10,
        right: 10
    },
    checkPositionCenter: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{
            translateX: -15,
            translateY: -15
        }]
    }
})

export default CustomCheckbox