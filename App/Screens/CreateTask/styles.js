import { StyleSheet } from "react-native";
import fonts from "../../Assets/fonts";
import { HEIGHT, WIDTH } from "../../Utils/Dimensions";

export const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#f57e59'
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    container: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        flex: 1
    },
    text: {
        fontSize: 22,
        color: '#fff',
        fontFamily: fonts.RobotoMedium
    },
    buttonContainer: {
        padding: 6,
        backgroundColor: '#f57e59',
        borderRadius: 20,
        elevation: 10,
        alignItems: 'center',
        width: WIDTH / 2,
        alignSelf: 'center',
        marginTop: HEIGHT / 7,
        marginVertical: 10
    },
    tab: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '45%',
    },
    button: {
        paddingHorizontal: 12,
        borderRadius: 2
    },
    icon: {
        width: 32,
        height: 32,
    },
    textBox: {
        borderBottomWidth: 1,
        borderBottomColor: '#f57e59',
        marginVertical: 15
    },
    label: {
        fontSize: 15,
        color: 'grey',
        fontFamily: fonts.RobotoMedium
    },
    input: {
        marginTop: HEIGHT / 99,
        fontSize: 17,
        marginVertical: 8,
        fontFamily: fonts.RobotoMedium
    },
})