import { createStore } from "solid-js/store"


interface chessRawArchives {
    archives: Array<string>
}

export interface gameData {
    accuracies: {
        white: number,
        black: number,
    }
    black: playerData,
    white: playerData,
    end_time: number,
    fen: string,
    initial_setup: string,
    pgn: string,
    rated: boolean,
    rules: string,
    tcn: string,
    time_class: string,
    time_control: string,
    url: string,
    uuid: string
}

interface  playerData{
    "@id": string
    rating: number,
    result: string,
    username: string,
    uuid: string
}

const getArchives = async (archiveUrl: string): Promise<Array<string>> => {
    const getArchives = await fetch(archiveUrl)
    const JSONArchives: chessRawArchives = await getArchives.json()
    return JSONArchives.archives
}

const getGames = async (gameUrl: string): Promise<Array<gameData>> => {
    const getGames = await fetch(gameUrl)
    const JSONGames = await getGames.json()
    return await JSONGames.games
}

const archiveUrl: string = "https://api.chess.com/pub/player/Samdoeschess/games/archives"

const flatten = (array: Array<any>) => array.reduce((acc, val) => acc.concat(val), []);

export const [chessData, setChessData] = createStore<gameData[]>([])

export const getData = async () => {
    try {
        const games = []
        const archives = await getArchives(archiveUrl)
        for (const i in archives){
            const rawGames:Array<gameData> = await getGames(archives[i])
            games.push(rawGames)
        }
        const allGames: Array<gameData> = flatten(games)
        setChessData(allGames)
    }
    catch (e) {
        console.error(e)
    }
}

