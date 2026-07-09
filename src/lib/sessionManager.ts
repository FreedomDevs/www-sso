export type Session = {
  username: string;
  masterToken: string;
};

export class SessionManager {
  private static readonly SESSIONS_KEY = 'sessions';
  private static readonly CURRENT_KEY = 'currentSession';

  private static load<T>(key: string, fallback: T): T {
    const value = localStorage.getItem(key);

    if (!value) return fallback;

    try {
      return JSON.parse(value);
    } catch {
      return fallback;
    }
  }

  private static save<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static getAll(): Session[] {
    return this.load(this.SESSIONS_KEY, []);
  }

  static add(session: Session): void {
    const sessions = this.getAll();

    if (sessions.some((s) => s.masterToken === session.masterToken)) return;

    this.save(this.SESSIONS_KEY, [...sessions, session]);
  }

  static remove(masterToken: string): void {
    const sessions = this.getAll().filter((s) => s.masterToken !== masterToken);
    this.save(this.SESSIONS_KEY, sessions);

    if (this.getCurrent()?.masterToken === masterToken) {
      localStorage.removeItem(this.CURRENT_KEY);
    }
  }

  static getCurrent(): Session | null {
    return this.load(this.CURRENT_KEY, null);
  }

  static setCurrent(session: Session): void {
    this.add(session);
    this.save(this.CURRENT_KEY, session);
  }
}