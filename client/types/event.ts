export type EventType = {
  id: string; // database id
  evntid: string;
  title: string;
  description: string;
  url: string;
  scheduled: string;
  slug: string;
};

export type TableStoreType = Pick<EventType, "id" | "evntid">;
