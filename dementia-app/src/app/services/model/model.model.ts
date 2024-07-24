export interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
}

export interface ChatUiMessage {
  sender: 'user' | 'api';
  text: string;
}

export interface ChatMessage {
  messageType : string;
  message : string;
}