
    export interface MeetingId {
        value: string;
    }

    export interface SessionId {
        value: string;
    }

    export interface MeetingSessionId {
        meeting: MeetingId;
        session: SessionId;
    }

    export interface Creator {
        value: string;
    }

    export interface Time {
        time: number;
        minutes: number;
        formatted: string;
    }

    export interface BookedTime {
        id: string;
        meetingSessionId: MeetingSessionId;
        description: string;
        date: Date;
        creator: Creator;
        time: Time;
    }

    export interface MeetingSessionTimeAggregate {
        session: SessionId;
        time?: Time;
        times: BookedTime[];
    }


