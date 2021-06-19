export type ResponseBody = string;

export type QueryParams = {
  event_type: string;
  repo: string;
};

export enum EventType {
  EntryCreate = 'entry.create',
  EntryUpdate = 'entry.update',
  EntryDelete = 'entry.delete',
  MediaCreate = 'media.create',
  MediaDelete = 'media.delete',
}

export type RequestBody = {
  event: EventType;
  created_at: string;
  model: string;
  entry: {
    [key: string]: unknown;
    id: number;
    created_at: string;
    updated_at: string;
  };
};
