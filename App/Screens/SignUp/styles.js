import { StyleSheet } from "react-native";
import fonts from "../../Assets/fonts";

export const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 30
    },
    heading: {
        fontSize: 32,
        color: '#000',
        fontFamily: fonts.RobotoBlack
    },
    subContainer: {
        marginTop: '25%'
    },
    bottomText: {
        alignSelf: 'center',
        marginTop: '30%',
        fontFamily: fonts.RobotoMedium
    },
    text: {
        fontSize: 16,
        color: '#f57e59',
        fontFamily: fonts.RobotoRegular
    },
})