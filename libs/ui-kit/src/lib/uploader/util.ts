//validate file extensions
export const isFileValid = (file: File, acceptedTypes: string[]) => {
  const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
  return acceptedTypes.length === 0 || acceptedTypes.includes(fileExtension);
};
