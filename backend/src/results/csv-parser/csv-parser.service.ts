import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import {
  CSV_SEPARATOR,
  ENOENT_ERROR,
  SANITIZE_REGEX,
} from 'src/common/constants';
import { ClassAsType } from 'src/common/util-types';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParser: CsvParser) {}

  public async doParse<T>(filePath: string, Entity: T) {
    try {
      if (!fs.existsSync(filePath)) {
        throw new Error(ENOENT_ERROR);
      }
      const stream = fs.createReadStream(filePath);
      const parsedData: ParsedData<ClassAsType<T>> = await this.csvParser.parse(
        stream,
        Entity,
        null,
        null,
        {
          separator: CSV_SEPARATOR,
          mapHeaders: ({ header }) => this.sanitizeSting(header),
          mapValues: ({ value }) => this.sanitizeSting(value),
        },
      );

      return parsedData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  /** Remove non UTF-8 chars from a string */
  public sanitizeSting(str: string): string {
    return str?.replace(SANITIZE_REGEX, '');
  }
}
