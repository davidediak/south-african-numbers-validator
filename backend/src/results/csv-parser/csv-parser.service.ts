import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CSV_SEPARATOR, SANITIZE_REGEX } from 'src/common/constants';
import { ClassAsType } from 'src/common/util-types';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParser: CsvParser) {}

  public async doParse<T>(filePath: string, Entity: T) {
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
  }

  /** Remove non UTF-8 chars from a string */
  private sanitizeSting(str: string): string {
    return str.replace(SANITIZE_REGEX, '');
  }
}
