export const DEFAULT_AFTER_LOGIN = '/';
export const LOGIN_PATH = '/login';

export function safeNext(raw: string | null | undefined): string {
  if (typeof window === 'undefined' || !raw) return DEFAULT_AFTER_LOGIN;
  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) return DEFAULT_AFTER_LOGIN;
    return url.pathname + url.search + url.hash;
  } catch {
    return DEFAULT_AFTER_LOGIN;
  }
}

export function readNextFromLocation(): string {
  return safeNext(new URLSearchParams(window.location.search).get('next'));
}

export function isAddAccountMode(): boolean {
  return new URLSearchParams(window.location.search).get('add') === '1';
}
