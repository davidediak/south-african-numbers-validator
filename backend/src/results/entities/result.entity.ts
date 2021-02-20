import { Outcome } from 'src/common/interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('result')
export class ResultEntity {
  @PrimaryGeneratedColumn('uuid') id: string;

  @Column('varchar')
  outcome: Outcome;

  @Column('varchar')
  originalId: string;

  @Column('varchar')
  originalValue: string;

  @Column('varchar', { nullable: true })
  correctedValue?: string;
}
