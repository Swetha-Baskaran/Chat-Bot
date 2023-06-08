import React, {useState, useRef} from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

const ChatPage = () => {
	const scrollViewRef = useRef();
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([
		{
			message: "Hi! How can I help you ?",
			sender: "ai",
		},
	]);
	const send = async () => {
		if (message) {
			await setMessages([...messages, {message: message, sender: "user"}]);
			setMessage("");
			await sendMessage();
		}
	};

	const sendMessage = async () => {
		const options = {
			method: "POST",
			url: "https://chatgpt-api7.p.rapidapi.com/ask",
			headers: {
				"content-type": "application/json",
				"X-RapidAPI-Key":
					"7e3622d2a1msh75f497f069a0051p1500b8jsn8fee94ad6cf6",
				"X-RapidAPI-Host": "chatgpt-api7.p.rapidapi.com",
			},
			data: {
				query: message,
			},
		};
		try {
			const response = await axios.request(options);
			setMessages([
				...messages,
				{message: message, sender: "user"},
				{message: response?.data?.response, sender: "ai"},
			]);
		} catch (error) {
			console.error(error);
			setMessages([
				...messages,
				{message: "sry...try again...", sender: "ai"},
			]);
		}
	};

	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "#fff",
				height: "100%",
			}}
		>
			<Image
				source={require("../assets/bot.jpg")}
				style={{
					animationName: "moveUpDown",
					animationIterationCount: "infinite",
					animationDirection: "alternate",
					animationDuration: "2s",
					width: 300,
					height: 300,
					position: "absolute",
					top: 250,
					bottom: 0,
					left: 40,
					right: 0,
					justifyContent: "center",
					alignItems: "center",
					opacity: 0.4,
				}}
			/>
			<ScrollView
				style={{
					flex: 1,
					color: "black",
					overflow: "scroll",
					margin: 10,
					marginTop: 60,
				}}
				ref={scrollViewRef}
				onContentSizeChange={() =>
					scrollViewRef.current.scrollToEnd({animated: true})
				}
			>
				{messages.map((msg, index) => (
					<>
						<View
							key={index}
							style={{
								display: "flex",
								justifyContent:
									msg.sender === "user" ? "flex-end" : "flex-start",
								flexDirection: "row",
								flexWrap: "wrap",
								alignItems: "flex-end",
							}}
						>
							{msg.sender !== "user" && (
								<Image
									style={{
										width: 25,
										height: 25,
										marginRight: 7,
										marginBottom: 6,
										borderRadius: 50,
										borderWidth: 1,
										borderColor: "#a5e89f",
									}}
									source={require("../assets/bot.jpg")}
								/>
							)}
							<Text
								selectable
								style={{
									backgroundColor: "#a5e89f",
									padding: 9,
									marginTop: 4,
									marginBottom: 5,
									borderRadius: 10,
									maxWidth: 270,
									fontSize: 17,
									borderBottomRightRadius:
										msg.sender === "user" ? 0 : 10,
									borderBottomLeftRadius:
										msg.sender !== "user" ? 0 : 10,
								}}
							>
								{msg.message}
							</Text>
						</View>
					</>
				))}
			</ScrollView>
			<View
				style={{
					padding: 10,
					flexDirection: "row",
					alignItems: "center",
					paddingTop: 7,
				}}
			>
				<TextInput
					multiline
					numberOfLines={3}
					style={{
						flex: 1,
						borderRadius: 10,
						fontSize: 17,
						paddingHorizontal: 16,
						borderWidth: 1,
						borderColor: "#a5e89f",
						backgroundColor: "#a5e89f47",
						marginRight: 10,
						height: 70,
					}}
					value={message}
					onChangeText={text => setMessage(text)}
					placeholder='Type your message here'
				/>
				<View
					style={{
						backgroundColor: "#a5e89f",
						height: "100%",
						display: "flex",
						borderRadius: 10,
						alignItems: "center",
						position: "relative",
					}}
				>
					<TouchableOpacity onPress={send}>
						<Text
							style={{
								transform: "translate(0px, 19px)",
								fontSize: 17,
								padding: 4,
								paddingHorizontal: 17,
							}}
						>
							<Icon
								name='send'
								style={{
									fontSize: 25,
								}}
							/>
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ChatPage;
