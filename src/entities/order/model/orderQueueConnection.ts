export type OrderQueueConnection = {
  lastUpdatedAt: Date | null;
  status: 'connecting' | 'live' | 'reconnecting';
};
