// TODO: ask 'image-size' to export ISizeCalculationResult
import type { ISizeCalculationResult } from 'image-size/dist/types/interface';

export type Image = ISizeCalculationResult & {
  bytes: number;
  src: string;
};

export type Options = {
  context?: string;
  emitFile?: boolean;
  name?: string;
  outputPath?: string | ((url: string, resourcePath: string, context: string) => string);
  postTransformPublicPath?: (p: string) => string;
  publicPath?: string | ((url: string, resourcePath: string, context: string) => string);
  regExp?: string | RegExp;
};
