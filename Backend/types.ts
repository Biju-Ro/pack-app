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
    name: string;
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
 * - yesVotes: a list of Users who have indicated that they plan on coming.
 * - maybeVotes: a list of Users who have indicated that they may be able to come.
 * - noVotes: a list of Users who have indicated that they cannot attend this event.
 */
export interface Event {
    eid: number;
    title: string;
    host: User;
    month: number;
    day: number;
    year: number;
    hour: number;
    minute: number;
    meridiem: 'AM' | 'PM';
    tags: Tag[];
    yesVotes: User[];
    maybeVotes: User[];
    noVotes: User[];
}

export interface Application {
    events: Event[]
    tags: Tag[]
    users: User[]
}  