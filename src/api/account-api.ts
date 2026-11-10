import type { APIRequestContext } from '@playwright/test';
import type { TestUser } from '../utils/test-data';

interface ApiResponse {
  responseCode: number;
  message: string;
}

function isApiResponse(value: unknown): value is ApiResponse {
  return (
    typeof value === 'object' &&
    value !== null &&
    'responseCode' in value &&
    typeof value.responseCode === 'number' &&
    'message' in value &&
    typeof value.message === 'string'
  );
}

export async function deleteAccount(
  request: APIRequestContext,
  user: Pick<TestUser, 'email' | 'password'>,
): Promise<void> {
  const response = await request.delete('/api/deleteAccount', {
    form: {
      email: user.email,
      password: user.password,
    },
  });
  const body: unknown = await response.json();

  if (!response.ok() || !isApiResponse(body) || body.responseCode !== 200) {
    throw new Error(`Account cleanup failed: HTTP ${response.status()}, body: ${JSON.stringify(body)}`);
  }
}
