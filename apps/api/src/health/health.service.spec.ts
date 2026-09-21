import { HealthService } from './health.service';

describe('HealthService', () => {
  it('returns a healthy status payload', () => {
    const service = new HealthService();
    expect(service.getStatus()).toEqual({ status: 'ok', service: 'api' });
  });
});
