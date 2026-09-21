import { Injectable } from '@nestjs/common';

export interface HealthStatus {
  status: 'ok';
  service: 'api';
}

@Injectable()
export class HealthService {
  getStatus(): HealthStatus {
    return { status: 'ok', service: 'api' };
  }
}
