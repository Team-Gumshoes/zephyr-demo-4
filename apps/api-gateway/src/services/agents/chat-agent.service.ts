import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import { BaseAgentService } from './base-agent.service';

export class ChatAgentService extends BaseAgentService {
  async sendChat(request: ChatRequest): Promise<ChatResponse> {
    return this.post<ChatResponse>('/chat', request);
  }


}

// Export singleton instance
export const chatAgent = new ChatAgentService();
