import type { ChatRequest, ChatResponse } from '@allorai/shared-types';
import { BaseAgentService } from './base-agent.service';

export class TipsAgentService extends BaseAgentService {
  async sendTipsRequest(request: ChatRequest): Promise<ChatResponse> {
    return this.post<ChatResponse>('/tips', request);
  }
}

// Export singleton instance
export const tipsAgent = new TipsAgentService();
