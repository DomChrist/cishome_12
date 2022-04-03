export class TeamMember {

    id: string;
    group: string;
    name: string;
    image:TeamMemberImage;

}

export interface TeamMemberImage {
    contentType:string;
    baseImage: string;
}
