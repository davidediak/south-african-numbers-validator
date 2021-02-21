import { Outcome } from 'src/app/result/models/outcome';

export class Result {
  id: string;
  outcome: Outcome;
  originalId: string;
  originalValue: string;
  correctedValue?: string;
}
