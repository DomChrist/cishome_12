import {Participant} from "../../participant/domain/model/participant-model";

export class Commands {
}

export class CreateNewMeeting{

    public meetingTime: Date;
    public meetingDate: string;
    public subject: string;
    public description: string;

    public participants: Array<Participant>;

    set time( date: Date ){
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        this.meetingDate = date.toISOString();
        this.meetingTime = date;
    }

    get time(): Date {
        return this.meetingTime;
    }

}

export class CreateNewSession{
    public meetingId: string;
    public meetingDate: Date;
    public meetingDateString: string;
    public description: string;
    public participantsFromMeeting: boolean;
    public participants: Participant[];
}

export class CreateParticipant{
    public firstName: string;
    public lastName: string;
    public email: string;
}



