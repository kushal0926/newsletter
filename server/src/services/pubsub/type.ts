export interface PubSubService {
  publish(topicId: string, payload: Record<string, any>): Promise<string>;

  validatePayload(payload: Record<string, any>): boolean;
}
