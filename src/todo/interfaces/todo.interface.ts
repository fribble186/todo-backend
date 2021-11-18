export interface LoginDTO {
  phoneNumber: string;
  password: string;
}

interface Itodo {
  data: {
    id: string;
    content: string;
    endTime: string;
    doneTime?: string;
    status?: 'ADD' | 'DELETE';
  }[];
}

export interface SyncDTO {
  phoneNumber: string;
  todo: Itodo;
}
