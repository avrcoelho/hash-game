import {
  ObjectID,
  ObjectIdColumn,
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Hash')
class Notifications {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  player_1: string;

  @Column()
  player_2: string;

  @Column()
  game: [
    {
      player: string;
      position: number;
      type: 'x' | 'o';
    },
  ];

  @Column()
  winner: string;

  @Column()
  winningMode: number[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Notifications;
