export interface IItem {
  id: string;
  name: string;
}

export interface ILists {
  id: string;
  items: IItem[];
}
