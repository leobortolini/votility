export interface Result {
    identifier: string;
    votes: {
      option: number;
      count: number;
    }[];
}
