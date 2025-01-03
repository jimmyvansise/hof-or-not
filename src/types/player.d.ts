type Player = {
    readonly playerId: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly nickname: string;
    readonly position: string;
    readonly superBowlWins: number;
    readonly proBowls: number;
    readonly mvps: number;
    readonly yearRetired: number;
    readonly picture: string;
};

type HofChoice = {
    readonly hofChoice: boolean | null;
}

type PlayerWithHofChoice = Player & HofChoice;