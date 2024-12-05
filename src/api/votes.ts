const baseAddress = `${process.env.NEXT_PUBLIC_API_URL}/votes`;

export const postVote = async (playerId: number, hofChoice: boolean): Promise<Vote> => {
    const response = await fetch(`${baseAddress}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'POST',
        },
        body: JSON.stringify({ playerId, hofChoice }),
        credentials: 'include' // to include cookie for userId
    });

    if (!response.ok) {
        throw new Error(`Failed to vote for player: ${playerId}`);
    }

    return response.json();
};