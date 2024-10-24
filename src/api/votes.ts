const baseAddress = `${process.env.NEXT_PUBLIC_API_URL}/votes`;

export const postVote = async (playerId: number, hofChoice: boolean): Promise<Vote> => {
    const response = await fetch(`${baseAddress}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'POST',
        },
        body: JSON.stringify({ playerId, hofChoice }),
        credentials: 'include'
    });
    
    const vote = await response.json();
    console.log('got data for postVote:', vote);

    return vote;
};