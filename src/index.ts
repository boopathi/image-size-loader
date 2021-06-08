import fs from 'fs';
import path from 'path';
import imageSize from 'image-size';
import { interpolateName } from 'loader-utils';
import type { LoaderContext } from 'webpack';

import { imageToString, normalizePath } from './utils';
import type { Image, Options } from './interfaces';
import { SCHEMA } from './options';

export default function loader(this: LoaderContext<Options>, content: string): string {
  const options = this.getOptions(SCHEMA);

  const context = options.context || this.rootContext;
  const name = options.name || '[contenthash].[ext]';

  const url = interpolateName(this, name, {
    context,
    content,
    regExp: options.regExp,
  });

  let outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, this.resourcePath, context);
    } else {
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url, this.resourcePath, context);
    } else {
      publicPath = `${
        options.publicPath.endsWith('/') ? options.publicPath : `${options.publicPath}/`
      }${url}`;
    }

    publicPath = JSON.stringify(publicPath);
  }

  if (options.postTransformPublicPath) {
    publicPath = options.postTransformPublicPath(publicPath);
  }

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    const assetInfo = {
      immutable: false,
      sourceFilename: normalizePath(path.relative(this.rootContext, this.resourcePath)),
    };

    if (typeof name === 'string') {
      let normalizedName = name;

      const idx = normalizedName.indexOf('?');

      if (idx >= 0) {
        normalizedName = normalizedName.substr(0, idx);
      }

      const isImmutable = /\[([^:\]]+:)?(hash|contenthash)(:[^\]]+)?]/gi.test(normalizedName);

      if (isImmutable === true) {
        assetInfo.immutable = true;
      }
    }

    this.emitFile(outputPath, content, undefined, assetInfo);
  }

  const image: Image = {
    ...imageSize(this.resourcePath),
    bytes: fs.statSync(this.resourcePath).size,
    src: publicPath,
  };

  return imageToString(image);
}
loader.raw = true;
