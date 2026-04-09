import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);


    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);


    // load history
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await api.get("history/");
            setMessages(res.data);

            await api.post("mark-read/");
        } catch (err) {
            navigate("/login"); // redirect if not logged in
        }
    };

    // const fetchHistory = async () => {
    //     try {
    //         const res = await api.get("history/");
    //         setMessages(res.data);

    //         // mark as read
    //         await api.post("mark-read/");
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    // send message
    const sendMessage = async () => {
        if (!input.trim()) return;

        const timeNow = new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        const userMsg = {
            message: input,
            response: "",
            is_read: false,
            time: timeNow
        };

        // add user message first
        setMessages((prev) => [...prev, userMsg]);

        setInput("");
        setTyping(true);

        try {
            const res = await api.post("chat/", { message: input });

            setTimeout(() => {
                setTyping(false);

                setMessages((prev) => [
                    ...prev.slice(0, -1),
                    {
                        message: res.data.message,
                        response: res.data.response,
                        is_read: true,
                        time: timeNow
                    },
                ]);
            }, 1000);

        } catch (err) {
            console.log(err);
            setTyping(false);
        }
    };
    const handleLogout = async () => {
        await api.post("logout/");
        navigate("/login");
    };


    return (
        <div className="chat-container">

            {/* Header */}
            <div className="chat-header d-flex justify-content-between align-items-center">

                <div className="d-flex align-items-center gap-2">

                    <h5 className="mb-0 chat-title">TinyCare AI</h5>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>

            </div>

            {/* Chat Area */}
            <div className="chat-body">
                {messages.map((msg, index) => (
                    <div key={index}>

                        {/* User Message */}
                        <div className="user-msg">
                            <div className="bubble-user">

                                <span>{msg.message}</span>

                                <div className="msg-meta">
                                    <span className="msg-time">{msg.time}</span>

                                    <span className={`tick ${msg.is_read ? "read" : ""}`}>
                                        {msg.is_read ? "✔✔" : "✔"}
                                    </span>
                                </div>

                            </div>
                        </div>

                        {/* Bot Response */}
                        {msg.response && (
                            <div className="bot-msg">
                                <div className="bubble-bot">

                                    <span>{msg.response}</span>

                                    <div className="msg-time">{msg.time}</div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {/* Typing Indicator */}
                {typing && (
                    <div className="bot-msg">
                        <span className="bubble-bot typing">
                            Typing...
                        </span>
                    </div>
                )}
                <div ref={chatEndRef}></div>
            </div>


            {/* Input */}
            <div className="chat-input">

                <input
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />

                <button className="chat-send-btn" onClick={sendMessage}>
                    ➤
                </button>

            </div>
        </div>
    );
}

export default Chat;