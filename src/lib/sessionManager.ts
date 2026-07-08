export type Session = {
  username: string;
  masterToken: string;
};

export class SessionManager {
  static getAll(): Session[] {
    return JSON.parse(localStorage.getItem('sessions') ?? '[]');
  }

  static add(session: Session) {
    const sessions = this.getAll();
    sessions.push(session);
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }

  static remove(masterToken: string): void {
    const sessions = this.getAll().filter((s) => s.masterToken !== masterToken);
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }

  static getCurrent(): Session {
    return JSON.parse(localStorage.getItem('currentSession') ?? '');
  }

  static setCurrent(session: Session): void {
    if (!this.getAll().find((s: Session): boolean => s === session))
      this.add(session);

    localStorage.setItem('currentSession', JSON.stringify(session));
  }
}
