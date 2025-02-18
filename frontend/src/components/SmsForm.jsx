import { useState } from "react";
import axios from "axios";
import "../styles/SmsForm.css";

const SmsForm = () => {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const sendMessage = async () => {
    // Prepend +91 if it's not already there
    const formattedPhone = phone.startsWith("+91") ? phone : `+91${phone}`;

    try {
      const response = await axios.post(
        "https://sms-app-gca8.onrender.com/send-sms",
        {
          phone: formattedPhone,
          message,
        }
      );
      setStatus(response.data.message);
    } catch (error) {
      setStatus("Error sending message.");
    }
  };

  return (
    <div className="sms-container">
      <h2>Send SMS</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {status && <p>{status}</p>}
    </div>
  );
};

export default SmsForm;
