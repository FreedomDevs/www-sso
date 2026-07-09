export class AccessManager {
  private static readonly ACCESS_TOKEN_KEY = 'access_token';

  static get(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  static set(token: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  static remove(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  static has(): boolean {
    return this.get() !== null;
  }
}
