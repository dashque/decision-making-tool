function createBlob(data: unknown): string {
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  return url;
}

export { createBlob };
