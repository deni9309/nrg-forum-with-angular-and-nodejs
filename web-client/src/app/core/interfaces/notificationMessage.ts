import { MessageType } from "src/app/shared/constants/messageType";

export interface NotificationMessage {
    text: string;
    type: MessageType;
}