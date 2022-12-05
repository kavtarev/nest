import { IDocumentBuilder } from './document-builder.interface';
import * as kit from 'pdfkit';
import { Readable } from 'stream';

export class PdfDocumentBuilder implements IDocumentBuilder {
  private builder: PDFKit.PDFDocument;

  constructor() {
    this.builder = new kit();
  }

  addLine(line: string) {
    this.builder.fillColor('#000').fontSize(12).text(line);
    return this;
  }

  addTitle(line: string) {
    this.builder.fillColor('#675').fontSize(12).text(line);
    return this;
  }

  setColor(color: string) {
    this.builder.fillColor(color);
    return this;
  }

  setFont(font: string) {
    this.builder.font(font);
    return this;
  }

  toStream() {
    this.builder.end();

    return this.builder as unknown as Readable;
  }

  getOptions(): Record<string, string> {
    return {
      disposition: `attachment; filename="report.pdf"`,
      type: 'application/pdf',
    };
  }
}
