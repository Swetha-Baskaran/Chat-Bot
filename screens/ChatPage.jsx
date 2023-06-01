import React, {useState, useRef} from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	ImageBackground,
} from "react-native";
import axios from "axios";
import {API_URL, API_KEY} from "@env";

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
			console.log(messages);
			await sendMessage();
		}
	};
	const sendMessage = async () => {
		const options = {
			method: "GET",
			url: API_URL,
			params: {
				message: message,
				uid: "user1",
			},
			headers: {
				"X-RapidAPI-Key": API_KEY,
				"X-RapidAPI-Host": "ai-chatbot.p.rapidapi.com",
			},
		};
		try {
			const response = await axios.request(options);
			console.log(messages);
			setMessages([
				...messages,
				{message: message, sender: "user"},
				{message: response?.data?.chatbot?.response, sender: "ai"},
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
				// background: `url(${require("../assets/bot.jpg")})`,
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
					opacity:0.4,
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
								style={{
									backgroundColor: "#a5e89f",
									padding: 9,
									marginTop: 4,
									marginBottom: 4,
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
					justifyContent: "center",
					paddingTop: 7,
				}}
			>
				<Text>a</Text>
				<Text>b</Text>
				<Text>c</Text>
			</View>
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
					}}
				>
					<TouchableOpacity onPress={send}>
						<Text
							style={{
								// borderRadius: 10,
								// backgroundColor: "#a5e89f",
								// height:0,
								fontSize: 17,
								padding: 4,
								paddingHorizontal: 17,
							}}
						>
							Send
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default ChatPage;
