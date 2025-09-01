/**
 * Normaliza texto removendo acentos, cedilhas e convertendo para minúsculas
 * Para busca insensível a acentos e caracteres especiais
 */
export function normalizeText(text: string): string {
  return text
    .normalize("NFD") // Decompõe caracteres com acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove marcas diacríticas (acentos)
    .replace(/ç/g, "c") // Substitui ç por c
    .replace(/Ç/g, "c") // Substitui Ç por c
    .toLowerCase() // Converte para minúsculas
    .trim(); // Remove espaços extras
}

/**
 * Normaliza array de palavras para busca
 */
export function normalizeWords(text: string): string[] {
  return normalizeText(text).split(/\s+/).filter(word => word.length > 0);
}