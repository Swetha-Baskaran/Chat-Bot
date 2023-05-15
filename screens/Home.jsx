import {StatusBar} from "expo-status-bar";
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	Image,
} from "react-native";

export default function Home({navigation}) {
	return (
		<View style={styles.container}>
			<Image source={require("../assets/bot.jpg")} style={styles.image} />
			{/* <Text style={styles.text}>shall we start</Text> */}
			<TouchableOpacity
				onPress={() => navigation.navigate("Profile", {name: "Jane"})}
			>
				<Text style={styles.button}>Start Chat</Text>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
	},
	button: {
		width: 300,
		textAlign: "center",
		backgroundColor: "#a5e89f",
		borderRadius: 10,
		color: "white",
		paddingVertical: 10,
		paddingHorizontal: 17,
		fontSize: 20,
		fontWeight: 400,
	},
	moveUpDown: {
		transform: [{translateY: -10}, {translateY: 10}],
	},
	image: {
		animationName: "moveUpDown",
		animationIterationCount: "infinite",
		animationDirection: "alternate",
		animationDuration: "2s",
		width: 300,
		height: 300,
	},
	text: {
		fontSize: 20,
	},
});
