import * as docx from 'docx';
import { Packer, Paragraph, SectionType, TextRun } from 'docx';
import { Readable } from 'stream';
import { IDocumentBuilder } from './document-builder.interface';

interface IDocxBuilder extends IDocumentBuilder {
  setBackGround(): void;
}

export class DocxDocumentBuilder implements IDocxBuilder {
  private sections: any[] = [];

  private color: string;

  setBackGround() {
    console.log(78);
  }

  addLine(line: string) {
    this.sections.push({
      properties: {
        type: SectionType.CONTINUOUS,
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 12,
              color: this.color,
            }),
          ],
        }),
      ],
    });

    return this;
  }

  addTitle(line: string) {
    this.sections.push({
      properties: {
        type: SectionType.CONTINUOUS,
      },
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 20,
              bold: true,
              color: this.color,
            }),
          ],
        }),
      ],
    });

    return this;
  }

  setColor(color: string) {
    this.color = color;

    return this;
  }

  setFont(font: string) {
    return this;
  }

  toStream() {
    const document = new docx.Document({ sections: this.sections });
    return Packer.toStream(document) as Readable;
  }

  getOptions(): Record<string, string> {
    return {
      disposition: `attachment; filename="report.docx"`,
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    };
  }
}
