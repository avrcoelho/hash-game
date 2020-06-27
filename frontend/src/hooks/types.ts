export interface GameData {
  player?: string;
  position: number;
  type?: 'x' | 'o';
  positionWinner?: boolean;
}

export interface HashData {
  id: string;
  player_1: string;
  player_2: string;
  nextPlayer: null | string;
  playerInit: null | string;
  you: string;
  game: GameData[];
  winningMode?: number[];
  winner?: string;
}

export interface IntegrationState {
  token: string;
  hash: HashData;
  loading: boolean;
  loadingMove: boolean;
}

export interface ResponseInitGameData {
  token: string;
  hash: HashData;
}

export interface MoveGameRequest {
  id: string;
  position: number;
}

export interface IntegrationContextData {
  hash: HashData;
  loading: boolean;
  loadingMove: boolean;
  initGame(data: Pick<HashData, 'player_1'>): Promise<void>;
  insertPlay2(data: Pick<HashData, 'player_2' | 'id'>): Promise<void>;
  showGame(id: string): Promise<void>;
  moveGame(data: MoveGameRequest): Promise<void>;
  updateData(data: HashData): void;
  playAgainGame(id: string): Promise<void>;
  closeGame(id: string): Promise<void>;
  deleteData(): void;
}
