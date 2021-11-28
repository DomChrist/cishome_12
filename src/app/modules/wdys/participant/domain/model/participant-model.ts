import {Mail} from "../../../meeting/domain/meeting-model";

export class ParticipantModel {
}

export class Participant{

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
