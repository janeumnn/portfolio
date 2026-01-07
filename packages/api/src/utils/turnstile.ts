import ky from 'ky';

export async function validateToken(token: string, secret: string) {
  const data = await ky
    .post('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      json: {
        response: token,
        secret: secret
      }
    })
    .json<{
      'error-codes': string[];
      'success': boolean;
      'action': string;
      'cdata': string;
    }>();

  return {
    success: data.success,
    error: data['error-codes']?.length ? data['error-codes'][0] : null
  };
}
