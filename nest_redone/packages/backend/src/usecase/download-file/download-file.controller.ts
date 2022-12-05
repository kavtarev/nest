import { Controller, Get, StreamableFile } from '@nestjs/common';
import { DocumentBuilder } from 'src/common/document-builders/document-builder';
import { DocxDocumentBuilder } from 'src/common/document-builders/docx-document-builder';

@Controller()
export class DownloadFileController {
  @Get('download')
  async execute() {
    const builder = new DocumentBuilder();
    const docxBuilder = new DocxDocumentBuilder();
    builder.setBuilder(docxBuilder);

    builder.setFont('Helvetica-Bold');
    builder.addTitle('HUI');
    builder.addLine('Psina ebanaya');

    return new StreamableFile(builder.toStream(), builder.getOptions());
  }
}
