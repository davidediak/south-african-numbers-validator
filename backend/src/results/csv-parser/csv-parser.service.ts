import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { CSV_SEPARATOR, SANITIZE_REGEX } from 'src/common/constants';

@Injectable()
export class CsvParserService {
  constructor(private readonly csvParser: CsvParser) {}

  public async doParse<T>(filePath: string, Entity: T) {
    const stream = fs.createReadStream(filePath);
    const parsedData: ParsedData<ReturnType<T>> = await this.csvParser.parse(
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

  private sanitizeSting(str: string): string {
    return str.replace(SANITIZE_REGEX, '');
  }
}

type ReturnType<T> = T extends new () => infer R ? R : never;
