import { PubSubService } from "./type";

export class TestPubSub implements PubSubService {
    validatePayload(payload: Record<string, unknown>): boolean {
    return !!payload;
  }

  publish(topicId: string, payload: Record<string, unknown>): Promise<string> {
    console.log(payload);
    return Promise.resolve(`published to ${topicId} successfully`); 
  }
}
