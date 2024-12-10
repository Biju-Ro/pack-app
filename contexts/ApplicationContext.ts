import { createContext } from 'react';
import { User, Tag, Event, Message, RAChat, FloorChat, RotatingChat } from '../types';
import { TAGDATA, USERDATA, EVENTDATA } from '@/data/application';

/**
 * Interface representing the context type for user login management.
 *
 * - setUser - A function to update the current user in the context,
 *             which take User object representing the logged-in user or null
 *             to indicate no user is logged in.
 */
export interface ApplicationContextType { 
  users: User[];
  setUsers: (users: User[]) => void;
  events: Event[];
  setEvents: (events: Event[]) => void;
  raChat: RAChat;
  setRAChat: (raChat: RAChat) => void;
  floorChat: FloorChat;
  setFloorChat: (floorChat: FloorChat) => void;
  rotatingChat: RotatingChat;
  setRotatingChat: (RotatingChat: RotatingChat) => void;
}

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export default ApplicationContext;