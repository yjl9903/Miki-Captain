export interface CaptainRecord {
  uid: number;

  username: string;

  type: string;
}

export interface Record {
  date: Date;

  captains: CaptainRecord[];
}
