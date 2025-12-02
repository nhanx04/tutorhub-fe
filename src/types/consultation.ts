export interface Consultation {
  id: number;
  topic: string;
  description: string;
  consultationDate: string;
  consultationTime: string;
  type: 'ONLINE' | 'OFFLINE';
  locationLink: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  groupId: number;
  groupName: string;
}

export interface ConsultationFormData {
  topic: string;
  description: string;
  consultationDate: string;
  consultationTime: string;
  type: 'ONLINE' | 'OFFLINE';
  locationLink: string;
  groupId: number;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
}

