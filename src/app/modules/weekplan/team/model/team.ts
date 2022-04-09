export class TeamMember {
    id: string;
    group: string;
    name: string;
    initial: string;
    image: TeamMemberImage;

}

export interface TeamMemberImage {
    contentType:string;
    baseImage: string;
}
