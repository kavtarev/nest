import { applyDecorators, SetMetadata } from '@nestjs/common';

export function SetMetaDecorator(name: string) {
  return SetMetadata(name, true);
}
