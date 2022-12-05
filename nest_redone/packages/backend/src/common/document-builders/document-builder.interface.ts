import { Readable } from 'stream';

export interface IDocumentBuilder {
  addLine(line: string): void;
  addTitle(line: string): void;
  setColor(color: string): void;
  setFont(font: string): void;
  toStream(): Readable;
  getOptions(): Record<string, string>;
}
