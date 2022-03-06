export interface SecretNote {
    id: string;
    name: string;
    secrets: SecretItem[],
    creator: string;
    created: Date;
    updated: Date;
}

export interface SecretItem {
    description: string;
    secret: string;
    decrypted: string;
}
