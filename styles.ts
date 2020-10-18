import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
    },
    
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },

    main: {
        position: "absolute",
        width: "100%",
        height: "100%",
    }
})

export default styles;