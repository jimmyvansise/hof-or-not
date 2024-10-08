
const baseAddress = 'http://localhost:8080/players';

export const getPlayer = async (playerId: number): Promise<string> => {
    console.log('1');
    const response = await fetch(`${baseAddress}/${playerId}`);
    
    const data = await response.json();
    console.log('got data for getPlayer:', data);

    return data;
};