import {Participant} from "../../participant/domain/model/participant-model";

export class MeetingNoteCommands {
}

export class CreateMeetingNoteCommand {
    public participantId: string;
    public meetingId: string;
    public sessionId: string;

    public participants: Array<Participant>;

    public note: string;

}
