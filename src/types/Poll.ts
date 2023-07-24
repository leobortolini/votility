export interface Poll {
  id: string;
  title: string;
  description: string;
  created_at: string;
  expire_date: string;
  options: Option[];
}

export interface Option {
  id: number;
  title: string;
  created_at: string;
}
