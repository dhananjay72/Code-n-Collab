export const supportedLanguages = ["javascript", "python", "java", "c", "cpp"];

export function getLanguageMode(lang) {
  switch (lang) {
    case "c":
      return "text/x-csrc";
    case "cpp":
      return "text/x-c++src";
    case "java":
      return "text/x-java";
    default:
      return lang;
  }
}
