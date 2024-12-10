import { useEffect, useState } from 'react';
import { Application, User, Tag, Event, Message, RAChat, FloorChat, RotatingChat } from '../types';
import { TAGDATA, USERDATA, EVENTDATA } from '@/data/application';
import useApplicationContext from './useApplicationContext';

const useApplication = () => {
    // Service Variables
    //const [users, setUsers] = useState<User[]>(USERDATA);
    //const [mainUser, setMainUser] = useState<User>(users[0]);
    // const [tags, setTags] = useState<Tag[]>([]);
    // const [events, setEvents] = useState<Event[]>([]);
    // const [raChat, setRAChat] = useState<RAChat | null>(null);
    // const [floorChat, setFloorChat] = useState<FloorChat | null>(null);
    // const [rotatingChat, setRotatingChat] = useState<RotatingChat | null>(null);

    const {
        users,
        setUsers,
        events,
        setEvents,
        raChat,
        setRAChat,
        floorChat,
        setFloorChat,
        rotatingChat,
        setRotatingChat,
    } =  useApplicationContext();

  
    useEffect(() => {
        console.log("Main User after UseEffect:", (users as User[])[0])
      
    }, [users, events, raChat, floorChat, rotatingChat]);

return {
    //mainUser,
    users,
    //tags,
    events,
    raChat,
    floorChat,
    rotatingChat,
    //setMainUser,
    setUsers,
    setEvents,
    setRAChat,
    setFloorChat,
    setRotatingChat,
    };
};

export default useApplication;