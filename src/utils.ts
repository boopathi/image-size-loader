import type { Image } from './interfaces';

export function normalizePath(path: string, stripTrailing = false): string {
  if (path === '\\' || path === '/') {
    return '/';
  }

  const len = path.length;

  if (len <= 1) {
    return path;
  }

  // ensure that win32 namespaces has two leading slashes, so that the path is
  // handled properly by the win32 version of path.parse() after being normalized
  // https://msdn.microsoft.com/library/windows/desktop/aa365247(v=vs.85).aspx#namespaces
  let prefix = '';

  if (len > 4 && path[3] === '\\') {
    // eslint-disable-next-line prefer-destructuring
    const ch = path[2];

    if ((ch === '?' || ch === '.') && path.slice(0, 2) === '\\\\') {
      // eslint-disable-next-line no-param-reassign
      path = path.slice(2);
      prefix = '//';
    }
  }

  const segs = path.split(/[/\\]+/);

  if (stripTrailing !== false && segs[segs.length - 1] === '') {
    segs.pop();
  }

  return prefix + segs.join('/');
}

export function imageToString({ bytes, height, orientation, src, type, width }: Image): string {
  return `
    module.exports = {
      bytes: ${bytes},
      height: ${JSON.stringify(height)},
      orientation: ${JSON.stringify(orientation)},
      src: ${src},
      type: ${JSON.stringify(type)},
      width: ${JSON.stringify(width)},
    };
    // For requires from CSS when used with webpack css-loader,
    // outputting an Object doesn't make sense,
    // So overriding the toString method to output just the URL
    module.exports.toString = function() {
      return ${src};
    };
  `;
}
