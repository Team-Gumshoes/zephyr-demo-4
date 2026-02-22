import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { config } from '../../config/env';
import logger from '../../utils/logger';

export class BaseAgentService {
  protected client: AxiosInstance;

  constructor(baseURL: string = config.AGENTS_URL) {
    this.client = axios.create({
      baseURL,
      timeout: 45_000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add interceptors for logging, error handling
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.warn('Agent API Error:', error.message); // TODO error handling and logging here possibly redundant ?
        throw error;
      },
    );
  }

  // TODO protected async post<T extends BaseAgentResponse>(
  protected async post<T>(
    endpoint: string,
    data: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }
}
