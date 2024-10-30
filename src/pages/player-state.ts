export interface PlayerState {
    isLoading: boolean;
    currentPlayerIdx: number;
    data: Player | null;
    showVoteResults: false,
    voteData: Vote | null,
  }