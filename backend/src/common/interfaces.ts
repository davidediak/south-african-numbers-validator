import {
  SOUTH_AFRICA_CONTRY_CODE,
  SOUTH_AFRICA_NUMBER_LENGTH,
} from 'src/common/constants';

export enum Outcome {
  Accepted = 'ACCEPTED',
  Rejected = 'REJECTED',
  Corrected = 'CORRECTED',
}

/* we must use regular a js object because TS enum doesn't support computed values */
const _rejectionReasons = {
  NAN: `Input value contains non-numeric characters.
  Also couldn't detect a valid number as substring neither` as const,
  WrongLength: `Input value doesn't have the correct length.
  A valid number has ${SOUTH_AFRICA_NUMBER_LENGTH} digits` as const,
  WrongCountryCode: `Input value has a wrong contry code.
  A valid number should start with ${SOUTH_AFRICA_CONTRY_CODE}` as const,
};

export const rejectionReasons = Object.freeze(_rejectionReasons);
