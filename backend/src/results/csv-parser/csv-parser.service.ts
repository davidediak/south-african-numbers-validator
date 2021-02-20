import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';

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
        separator: ',',
        mapHeaders: ({ header }) => this.sanitizeSting(header),
        mapValues: ({ value }) => this.sanitizeSting(value),
      },
    );

    return parsedData;
  }

  private sanitizeSting(str: string): string {
    return str.replace(/[^\x00-\x7F]/g, '');
  }
}

type ReturnType<T> = T extends new () => infer R ? R : never;
