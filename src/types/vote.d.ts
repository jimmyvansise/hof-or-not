type Vote = {
    readonly id: number;
    readonly userId: string;
    readonly playerId: number;
    readonly hofChoice: boolean;
    readonly createdAt: dateTime;
    readonly updatedAt: dateTime;
};