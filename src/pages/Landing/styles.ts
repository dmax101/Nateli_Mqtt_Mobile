import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        padding: 20,
        justifyContent: "space-between",
        height: "100%",
    },
    
    mainCard: {
        backgroundColor: "#3366ff",
        width: "100%",
        alignItems: "center",
        minHeight: 50,
        borderRadius: 20,
        marginTop: 20,
        paddingHorizontal: 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: "100%",
    },

    right: {
        marginTop: 15,
        alignContent: "space-around",
        alignItems: "flex-start",
    },

    greetings: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 10,
        textAlign: "center",
    },

    name: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 35,
        textAlign: "center",
    },

    serverStatusText: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 15,
        textAlign: "center",
    },

    left: {
        marginTop: -10,
        marginBottom: 10,
        alignContent: "flex-end",
        alignItems: "flex-end",
    },

    day: {
        color: "white",
        fontFamily: "NotoSansJP_700Bold",
        fontSize: 80,
        textAlignVertical: "center",
    },

    month: {
        color: "white",
        fontFamily: "NotoSansJP_700Bold",
        marginTop: -20,
        fontSize: 20,
        textAlign: "center",
    },

    weekDay: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 15,
        marginTop: 0,
        textAlign: "center",
    },

    weatherBar: {
        backgroundColor: "#FF0000",
        flexDirection: "row",
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
        width: "100%",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
    },

    cloudIcon: {
        marginHorizontal: 10,
    },

    weatherText: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 12,
        textAlign: "center",
    },

    statusBlock: {
        alignItems: "center",
        padding: 10,
    },
    
    statusTextLabel: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 10,
        textAlign: "center",
    },
    
    statusTextDisplay: {
        color: "white",
        fontFamily: "NotoSansJP_400Regular",
        fontSize: 18,
        textAlign: "center",
    },
    
    bottonBarGroup: {
        alignContent: "center",
        justifyContent: "center",
    },

    bottonBar: {
        backgroundColor: "#0C69E2",
        width: "100%",
        alignItems: "center",
        minHeight: 50,
        borderRadius: 10,
        marginTop: 20,
        paddingHorizontal: 20,
    }

})

export default styles;