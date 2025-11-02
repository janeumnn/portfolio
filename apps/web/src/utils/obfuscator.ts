export function obfuscate(str: string): string {
  return btoa(str);
}

export function deobfuscate(str: string): string {
  return atob(str);
}
