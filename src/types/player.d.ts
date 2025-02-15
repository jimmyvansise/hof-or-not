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

type RelatedPlayers = {
    readonly relatedPlayer1FirstName: string;
    readonly relatedPlayer1LastName: string;
    readonly relatedPlayer1Picture: string;
    readonly relatedPlayer1HofYesPercent: number;
    readonly relatedPlayer2FirstName: string;
    readonly relatedPlayer2LastName: string;
    readonly relatedPlayer2Picture: string;
    readonly relatedPlayer2HofYesPercent: number;
    readonly relatedPlayer3FirstName: string;
    readonly relatedPlayer3LastName: string;
    readonly relatedPlayer3Picture: string;
    readonly relatedPlayer3HofYesPercent: number;
}

type PlayerWithHofChoiceRelatedPlayers = Player & HofChoice & RelatedPlayers;