import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { supabase } from '../../utils/supabase/supabase';
import { Session } from '@supabase/supabase-js';
type ContextProps = {
	user: null | boolean;
	session: Session | null;
};

const AuthContext = createContext<Partial<ContextProps>>({});

interface Props {
	children: React.ReactNode;
}

const AuthProvider = (props: Props) => {
	// user null = loading
	const [user, setUser] = useState<null | boolean>(null);
	const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session ? true : false);
      
      if (session) {
        axios.defaults.headers.common.Authorization = session.access_token;
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session ? true : false);

      if (session) {
        axios.defaults.headers.common.Authorization = session.access_token;
      }
    })
  }, [user])

	return (
		<AuthContext.Provider
			value={{
				user,
				session,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };

export const useAuth = () => {
  const {user, session} = useContext(AuthContext);

  return {
    user,
    session,
  }
}
