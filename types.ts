/**
 * Interface representing a Tag in the application, which contains:
 * - tid - object id for this tag.
 * - tagname - The name of the tag.
 */
export interface Tag {
    tid: number;
    tagname: string;
}

/**
 * Interface representing a User in the application, which contains:
 * - uid - object id for this user.
 * - nuid - the nine digit id number that an neu student user of this app should have.
 * - name - The full name of this user
 * - nickname - The nickname/name the user wishes to go by in the app.
 * - major - This user's major
 * - minor - This user's minor
 * - gradelevel - What grade this user is in.
 * - picture - file location of this user's profile picture
 * - tags - a list of Tags that this user has attributed to themselves (interests, hobbies, etc.)
 */
export interface User {
    uid: number;
    nuid: string;
    firstname: string;
    lastname: string;
    nickname: string;
    major: string;
    minor: string;
    gradelevel: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Grad Student';
    picture: string;
    tags: Tag[];
}

/**
 * Interface representing an Event in the application, which contains:
 * - eid - the object id of this Event.
 * - title - The title of the Event.
 * - host - the User hosting the event.
 * - month - the numerical month of the event.
 * - day - the numerical day of the event.
 * - year - the year of the event.
 * - hour - the hour the event is planned to take place.
 * - minute - the minute the event is planned to take place.
 * - meridiem - whether the time indicated is AM or PM.
 * - tags - a list of Tags the host attributed to this event.
 * - yesVotes: a list of User ids who have indicated that they plan on coming.
 * - maybeVotes: a list of User ids who have indicated that they may be able to come.
 * - noVotes: a list of User ids who have indicated that they cannot attend this event.
 */
export interface Event {
    eid: number;
    title: string;
    hostname: string;
    hostuid: number;
    // month: number;
    // day: number;
    // year: number;
    // hour: number;
    // minute: number;
    // meridiem: 'AM' | 'PM';
    date: Date;
    // time: string;
    location: string;
    tags: Tag[];
    yesVotes: number[];
    maybeVotes: number[];
    noVotes: number[];
}

export interface Message {
    mid: number,
    text: string,
    senderUid: number,
    avatar: string,
    timestamp: Date,
}

export interface RAChat {
    messages: Message[],
}

export interface FloorChat {
    members: number[],
    messages: Message[],
}

export interface RotatingChat {
    members: number[],
    theme: Tag,
    secondsRemaining: number,
    messages: Message[],
}

export interface Application {
    events: Event[],
    tags: Tag[],
    currentUser: User,
    users: User[],
    floorChat: FloorChat,
    raChat: RAChat,
    rotatingChat: RotatingChat,
}  