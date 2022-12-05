import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { Response } from 'express';
import * as kit from 'pdfkit';
import stream from 'stream';

@Controller()
export class DownloadFileController {
  @Get('download')
  async execute() {
    const doc = new kit();

    doc.font('Helvetica-Bold');
    doc.fontSize(19);
    doc.text('hui');
    doc.text('pizda');
    doc.text('-----------');
    doc.text('hui');
    doc.text('pizda');
    doc.font('Helvetica');
    doc.fontSize(9);
    doc.text(' ');
    doc.text(' ');
    doc.text(' ');
    doc.text('hui');
    doc.text('pizda');

    doc.end();

    // class hui {
    //   doc = new kit();

    //   create() {
    //     this.doc.font('Helvetica-Bold');
    //     this.doc.fontSize(19);
    //     this.doc.text('hui');
    //     this.doc.text('pizda');
    //     this.doc.text('-----------');
    //     this.doc.text('hui');
    //     this.doc.text('pizda');
    //     this.doc.font('Helvetica');
    //     this.doc.fontSize(9);
    //     this.doc.text(' ');
    //     this.doc.text(' ');
    //     this.doc.text(' ');
    //     this.doc.text('hui');
    //     this.doc.text('pizda');
    //   }

    //   toStream() {
    //     this.doc.end();
    //     return this.doc as unknown as stream.Readable;
    //   }
    // }

    // const boobs = new hui();

    // boobs.create();
    // res.set({
    //   'Content-Type': 'application/pdf',
    //   'Content-Disposition': 'attachment; filename="hui.pdf"',
    // });

    return new StreamableFile(doc as unknown as stream.Readable, {
      disposition: `attachment; filename="report.pdf"`,
      type: 'application/pdf',
    });
    // return doc.pipe(res);
  }
}
