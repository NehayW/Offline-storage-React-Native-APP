import { StyleSheet } from "react-native";
import fonts from "../../Assets/fonts";
import { HEIGHT, WIDTH } from "../../Utils/Dimensions";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    top: {
        marginVertical: HEIGHT / 68,
    },
    title: {
        fontSize: 22,
        color: '#000',
        fontFamily: fonts.RobotoBold
    },
    title1: {
        fontSize: 16,
        color: 'grey',
        fontFamily: fonts.RobotoRegular
    },
    text: {
        fontSize: 18,
        color: '#fff',
        fontFamily: fonts.RobotoMedium
    },
    container: {
        marginTop: HEIGHT / 18,
        marginVertical: 10,
        alignItems: 'center',
        marginLeft: -5
    },
    button: {
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        elevation: 10
    },
    btnContainer: {
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 20,
        margin: 6
    },
    btnText: {
        color: '#000',
        fontFamily: fonts.RobotoRegular
    },
    indexBox: {
        backgroundColor: '#f57e59',
        padding: 10,
        borderRadius: 8
    },
    midContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: HEIGHT / 89,
    },
    heading: {
        fontSize: 18,
        fontFamily: fonts.RobotoMedium
    },
    icon: {
        width: 18,
        height: 18,
        tintColor: '#fff'
    },
    icons: {
        width: 24,
        height: 24,
    },
    txt: {
        color: '#fff',
        fontSize: 16,
        fontFamily: fonts.RobotoRegular
    },
    list: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20
    },

    icon1: {
        width: 20,
        height: 20,
        tintColor: '#fff',
    },
    task: {
        fontSize: 18,
        marginLeft: 10,
        color: '#000'
    },
    date: {
        fontSize: 14,
        marginLeft: 10,
        color: 'grey'
    },
    midText: {
        fontSize: 16,
        color: 'grey',
        textAlign: 'center',
        marginTop: '60%',
        fontFamily: fonts.RobotoRegular
    },
    modal: {
        backgroundColor: '#fff',
        margin: 60,
        padding: 15,
        borderRadius: 10,
        marginTop: '60%',
        elevation: 10,
        paddingHorizontal: 20
    }
})