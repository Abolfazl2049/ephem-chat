import {User} from "../user/entities.js";
import {Enclave} from "./entities.js";

async function createEnclave(users: User[]) {
  const enclave = await Enclave.create({users: users.map(u => u.id)});
  return enclave;
}
export {createEnclave};
