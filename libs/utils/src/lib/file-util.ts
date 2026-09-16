export function fileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  let i = 0;

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return `${bytes
    .toFixed(1)
    .toString()
    .replace(/(\.[0-9]*[1-9])0+$|\.0*$/, '$1')} ${units[i]}`;
}

export function getFileExtension(fileName: string) {
  const lastIndexOf: number = fileName?.lastIndexOf('.');
  if (lastIndexOf == -1) {
    return ''; // empty extension
  }
  return fileName?.substring(lastIndexOf + 1);
}

export function getFileType(fileName: string) {
  const extension = getFileExtension(fileName);
  switch (extension) {
    case 'xls':
      return 'application/vnd.ms-excel';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    case 'xml':
      return 'application/xml';
    case 'txt':
    case extension.match(/^[0-9]*$/) ? extension : undefined:
      return 'text/plain';
    case 'pdf':
      return 'application/pdf';
    case 'zip':
      return 'application/zip';
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'svg':
      return 'image/svg+xml';
    default:
      return '';
  }
}
