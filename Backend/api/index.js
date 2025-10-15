require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const main = require("../aiChatting");
const authRoutes = require("../routes/auth");

const app = express();
const server = http.createServer(app); // ✅ Create HTTP + Socket.IO server

// --------------------- MIDDLEWARE ---------------------
app.use(cors());
app.use(express.json());

// --------------------- DATABASE CONNECTION ---------------------
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("❌ Error: MONGO_URI not set in environment.");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });

// --------------------- ROUTES ---------------------
app.use("/api/auth", authRoutes); // 🔐 Login/Signup routes

// Root Route
app.get("/", (req, res) => {
  res.send({ message: "Server is running with Auth + Chat + PHQ-9 + WebSocket" });
});

// --------------------- CHAT MEMORY ---------------------
let Allchat = {};

// --------------------- CHAT ENDPOINT ---------------------
app.post("/chat", async (req, res) => {
  const { _id, msg } = req.body;

  if (!_id || !msg) {
    return res.status(400).send("Missing _id or msg in request body");
  }

  if (!Allchat[_id]) {
    Allchat[_id] = [];
  }
  const history = Allchat[_id];

  const ques = [
    ...history,
    {
      role: "user",
      parts: [
        {
          text:
            msg +
            " Respond like a compassionate mental health support counselor for students. " +
            "Keep replies short (3–5 sentences), empathetic, and practical. " +
            "Offer coping strategies for stress, anxiety, and academic pressure. " +
            "Give advice in the style of a psychological helper, but do not provide clinical diagnosis. " +
            "Do not mention being a bot or AI.",
        },
      ],
    },
  ];

  try {
    const answer = await main(ques);

    Allchat[_id] = [
      ...history,
      { role: "user", parts: [{ text: msg }] },
      { role: "model", parts: [{ text: answer }] },
    ];

    res.send(answer);
  } catch (err) {
    const message = err?.message || JSON.stringify(err);
    res.status(500).send(message);
  }
});

// --------------------- MENTAL HEALTH (PHQ-9) ENDPOINT ---------------------
app.post("/mental-health", async (req, res) => {
  const { _id, phq9 } = req.body;

  if (!_id || !phq9 || phq9.length !== 9) {
    return res.status(400).send("Invalid _id or PHQ-9 input");
  }

  const phqScore = phq9.reduce((a, b) => a + b, 0);

  const getSeverity = (score) => {
    if (score <= 4) return "Minimal";
    if (score <= 9) return "Mild";
    if (score <= 14) return "Moderate";
    if (score <= 19) return "Moderately Severe";
    return "Severe";
  };

  const phqSeverity = getSeverity(phqScore);

  const phqSummary = `PHQ-9 answers: ${phq9.join(", ")}. Total score = ${phqScore} (${phqSeverity}). These answers reflect the student's emotional state.`;

  const followUpMsg = `Based on my PHQ-9 score of ${phqScore} (${phqSeverity}), I am struggling. Please give me emotional support and coping tips. Keep your reply short (3–5 sentences), empathetic, encouraging, and vary wording. Avoid clinical diagnosis. Do not mention being an AI.`;

  Allchat[_id] = Allchat[_id] || [];
  Allchat[_id].push({
    role: "user",
    parts: [{ text: phqSummary }],
  });

  const ques = [
    ...Allchat[_id],
    { role: "user", parts: [{ text: followUpMsg }] },
  ];

  try {
    const answer = await main(ques);

    Allchat[_id].push(
      { role: "user", parts: [{ text: followUpMsg }] },
      { role: "model", parts: [{ text: answer }] }
    );

    res.send({
      phq9: {
        score: phqScore,
        severity: phqSeverity,
      },
      followUpResponse: answer,
    });
  } catch (err) {
    const message = err?.message || JSON.stringify(err);
    res.status(500).send({ error: message });
  }
});

// --------------------- SOCKET.IO (REALTIME CHAT) ---------------------
const io = new Server(server, {
  cors: {
    origin: "https://mind-ease-frontend-262m.vercel.app", // your frontend port
    methods: ["GET", "POST"],
  },
});
// hii
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Join a chat room
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Listen for messages
  socket.on("send_message", (data) => {
    console.log("Message received:", data);
    const msgData = {
      ...data,
      senderId: socket.id,
    };

    // Send message to all in room
    io.to(data.room).emit("receive_message", msgData);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// --------------------- START SERVER ---------------------
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server + WebSocket running on port ${PORT}`));

module.exports = app;
