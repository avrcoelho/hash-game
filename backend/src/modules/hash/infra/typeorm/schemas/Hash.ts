import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Hash')
class Hash {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  player_1: string;

  @Column()
  player_2: string;

  @Column()
  game: Array<{
    player: string;
    position: number;
    type: 'x' | 'o';
  }> = [];

  @Column()
  winner: string | null;

  @Column()
  numMatches: number = 0;

  @Column()
  winningMode: number[] | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Hash;
