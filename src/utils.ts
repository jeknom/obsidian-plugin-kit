import { stringify } from "yaml"

export const createYamlCodeBlock = <TContent extends object>(lang: string, content: TContent) => {
  return `\`\`\`${lang}\n${stringify(content)}\`\`\``
}

export const createJsonCodeBlock = <TContent extends object>(lang: string, content: TContent) => {
  return `\`\`\`${lang}\n${JSON.stringify(content, null, 4)}\n\`\`\``
}