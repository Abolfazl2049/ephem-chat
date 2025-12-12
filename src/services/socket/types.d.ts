import {Socket} from "socket.io";
import {User} from "../user/entities.ts";

interface MySocket extends Socket {
  data: SocketData;
}
interface SocketData {
  user: User;
  status: "searching" | "processing";
}
export {MySocket, SocketData};
