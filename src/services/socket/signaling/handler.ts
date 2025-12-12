import {Server} from "socket.io";
import {User} from "../../user/entities.js";
import {MySocket} from "../types.js";

export const registerSignalingNamespace = (io: Server) => {
  const signaling = io.of("/signaling");

  signaling.on("connection", async (socket: MySocket) => {
    const userId = socket.handshake.auth.userId;
    try {
      const user = await User.findByPk(userId);
      if (user) {
        socket.data.user = user;
        console.log("User connected to signaling:", socket.id, "userId:", userId);
      } else {
        socket.disconnect();
      }
    } catch (error) {
      console.error("Error during signaling connection:", error);
      socket.disconnect();
    }

    // WebRTC Offer
    socket.on("offer", data => {
      console.log("Offer received from:", socket.data?.user.id);
      // Forward to the other peer
      socket.to(data.targetSocketId).emit("offer", {
        from: socket.id,
        userId: socket.data?.user.id,
        offer: data.offer
      });
    });

    // WebRTC Answer
    socket.on("answer", data => {
      console.log("Answer received from:", socket.data?.user.id);
      socket.to(data.targetSocketId).emit("answer", {
        from: socket.id,
        userId: socket.data?.user.id,
        answer: data.answer
      });
    });

    // ICE Candidate
    socket.on("ice-candidate", data => {
      socket.to(data.targetSocketId).emit("ice-candidate", {
        from: socket.id,
        userId: socket.data?.user.id,
        candidate: data.candidate
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected from signaling:", socket.id, "userId:", socket.data?.user.id);
    });
  });
};
