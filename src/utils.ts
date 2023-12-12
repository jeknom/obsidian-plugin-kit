import { stringify } from "yaml"

const createCodeBlock = <TContent extends object>(lang: string, content: TContent) => {
  return `\`\`\`${lang}\n${stringify(content)}\`\`\``
}

export default createCodeBlock