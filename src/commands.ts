import type { Command, Editor } from "obsidian";
import createCodeBlock from "./utils";
import { OPK_COUNTER } from "./constants/codeBlockLang";
import type { Counter } from './types'
import { v4 } from 'uuid'

export const addCounter: Command = {
  id: 'opk-insert-counter',
    name: 'Insert Counter',
    editorCallback: (editor: Editor) => {
        editor.replaceRange(createCodeBlock(OPK_COUNTER, {
            id: v4(),
            title: 'Your title',
            value: 0,
        } as Counter),
            editor.getCursor()
        )
    }
}