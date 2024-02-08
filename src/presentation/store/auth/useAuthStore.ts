import { create } from 'zustand';
import { User } from '../../../domain/entities/user';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authLogin } from '../../../actions/auth/auth';



export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()( (set, get) => ({
  status: 'checking',
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);
    if ( !resp ) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      return false;
    }

    // TODO: Save token and user in storage
    console.log({ resp });

    set({ status: 'authenticated', token: resp.token, user: resp.user });

    return true;
  }


}))

