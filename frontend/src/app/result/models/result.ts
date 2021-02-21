import { Outcome } from 'src/app/result/models/outcome';

export class Result {
  id: string;
  outcome: Outcome;
  originalId: string;
  originalValue: string;
  correctedValue?: string;

  constructor(result: Partial<Result>) {
    Object.assign(this, result);
  }
}

export const acceptedTableHeaders: (keyof Result)[] = [
  'originalId',
  'originalValue',
  'outcome',
];

export const rejectedTableHeaders: (keyof Result)[] = [...acceptedTableHeaders];

export const correctedTableHeaders: (keyof Result)[] = [
  'originalId',
  'originalValue',
  'correctedValue',
  'outcome',
];
