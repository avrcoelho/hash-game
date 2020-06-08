// sobrescrever uma tipagem do express
declare namespace Express {
  // sobrescrever a importação que existe no Request. Ele não substitui, faz um anexo
  export interface Request {
    player: string;
  }
}
