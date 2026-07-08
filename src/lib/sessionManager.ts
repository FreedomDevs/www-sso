export type Session = {
  id: string;
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

  static remove(id: string) {
    const sessions = this.getAll().filter((s) => s.id !== id);
    localStorage.setItem('sessions', JSON.stringify(sessions));
  }
}
