import { useContext } from 'react';
import ApplicationContext, { ApplicationContextType } from '../contexts/ApplicationContext';
import { TAGDATA, USERDATA, EVENTDATA } from '@/data/application';

/**
 * Custom hook to access the LoginContext.
 *
 * @throws It will throw an error if the `LoginContext` is null.
 *
 * @returns context - the context value for managing login state, including the `setUser` function.
 */
const useApplicationContext = (): ApplicationContextType => {
  const context = useContext(ApplicationContext);

  if (context === null) {
    throw new Error('Application context is null.');
  }

  // if (!context.users) {
  //   context.setUsers(USERDATA);
  // }

  return context;
};

export default useApplicationContext;
