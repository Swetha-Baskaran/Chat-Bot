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
			console.log(messages);
			await sendMessage();
			setMessage("");
		}
	};
	const sendMessage = async () => {
		const options = {
			method: "GET",
			url: "https://ai-chatbot.p.rapidapi.com/chat/free",
			params: {
				message: message,
				uid: "user1",
			},
			headers: {
				"X-RapidAPI-Key":
					"7e3622d2a1msh75f497f069a0051p1500b8jsn8fee94ad6cf6",
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
			}}
		>
			<ScrollView
				style={{
					flex: 1,
					color: "black",
					overflow: "scroll",
					margin: 10,
					marginTop: 60,
					backgroundColor: "#fff",
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
									// color: "white",
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
					borderColor: "darkgray",
					borderTopWidth: 1,
					paddingTop: 7,
				}}
			>
				<TextInput
					style={{flex: 1, borderRadius: 10, paddingRight: 3}}
					value={message}
					onChangeText={text => setMessage(text)}
					placeholder='Type your message here'
				/>
				<TouchableOpacity onPress={send}>
					<Text
						style={{
							borderRadius: 10,
							backgroundColor: "#a5e89f",
							// color: "white",
							padding: 4,
							paddingHorizontal: 17,
						}}
					>
						Send
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChatPage;
