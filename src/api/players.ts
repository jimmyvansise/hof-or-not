const baseAddress = `${process.env.NEXT_PUBLIC_API_URL}/players`;

export const getPlayer = async (playerId: number): Promise<Player> => {
    const response = await fetch(`${baseAddress}/${playerId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'GET',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch player data');
    }

    return response.json();
};

export const getPlayerNames = async (): Promise<PlayerName[]> => {
    const response = await fetch(`${baseAddress}/names`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Method': 'GET',
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch player names');
    }

    return response.json();
};