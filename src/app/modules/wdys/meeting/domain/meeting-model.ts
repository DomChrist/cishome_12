export interface Mail {
    value: string;
}

export interface Participant {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    mail: Mail;
    initial: string;
    creator: string;
    version: number;
    created: Date;
    updated: Date;
}

export interface ParticipantMappingList {
    id: string;
    participant: Participant;
}

export interface Session {
    meetingSessionId: string;
    meetingId: string;
    meetingName: string;
    meetingDate: Date;
    description: string;
    participantMappingList: ParticipantMappingList[];
    participants: Participant[];
}

export interface Meeting {
    id: string;
    meetingTopic: string;
    creator: string;
    session: SessionWindow;
    participants: Participant[];
    dateRange: MeetingDateRange;
    objectVersion: number;
    created: Date;
    updated: Date;
}

export interface SessionWindow{
    sessions: Session[];
    lengthOfOne: boolean;
    empty: boolean;
    first: Session;
}

export interface MeetingDateRange{
    firstDate: Date;
    lastDate: Date;
    dateEqual: boolean;
}
