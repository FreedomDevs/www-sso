import { create } from 'zustand';

type EmailVerificationState = {
  token: string | null;
  email: string | null;

  setVerification: (token: string, email: string) => void;
  clearVerification: () => void;
};

export const useEmailVerification = create<EmailVerificationState>((set) => ({
  token: null,
  email: null,

  setVerification: (token, email) => set({ token, email }),

  clearVerification: () =>
    set({
      token: null,
      email: null,
    }),
}));
