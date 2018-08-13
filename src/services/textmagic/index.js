import TMClient from "textmagic-rest-client";
import { textmagicUser, textmagicKey } from "../../config";

const c = new TMClient(textmagicUser, textmagicKey);

export const sendText = ({ phones, text }) => {
  c.Messages.send({ text, phones }, err => err && console.error(err));
};
