export type Transaction = Readonly<{
    index: number;
    from: string;
    to: string;
}>;

export type Surfer = Readonly<{
    username: string;
    name: string;
    photo: string;
}>;
