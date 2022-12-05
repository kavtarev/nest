import { IDocumentBuilder } from './document-builder.interface';
import { PdfDocumentBuilder } from './pdf-document-builder';

interface IStrategy {
  setBuilder(builder: IDocumentBuilder): void;
}

export class DocumentBuilder implements IDocumentBuilder, IStrategy {
  private documentBuilder: IDocumentBuilder;

  constructor() {
    this.documentBuilder = new PdfDocumentBuilder();
  }

  setBuilder(builder: IDocumentBuilder): void {
    this.documentBuilder = builder;
  }

  addLine(line: string) {
    this.documentBuilder.addLine(line);
  }

  addTitle(line: string) {
    this.documentBuilder.addTitle(line);
  }

  setColor(color: string) {
    this.documentBuilder.setColor(color);
  }

  setFont(font: string) {
    this.documentBuilder.setFont(font);
  }

  toStream() {
    return this.documentBuilder.toStream();
  }

  getOptions(): Record<string, string> {
    return this.documentBuilder.getOptions();
  }
}
