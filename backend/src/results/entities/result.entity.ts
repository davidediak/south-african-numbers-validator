import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar')
  outcome: 'accepted' | 'rejected' | 'corrected';

  @Column('varchar')
  originalId: string;

  @Column('varchar')
  originalValue: string;

  @Column('numeric')
  correctedValue: number;
}
