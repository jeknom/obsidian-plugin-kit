import type { Command, Editor } from "obsidian";
import { createJsonCodeBlock, createYamlCodeBlock } from "./utils";
import { OPK_COUNTER, JSON_LANG } from "./constants/codeBlockLang";
import type { Counter, SurveyJournal } from './types'
import { v4 } from 'uuid'
import { SURVEY_JOURNAL } from "./constants/dataType";

export const addCounter: Command = {
    id: 'opk-insert-counter',
    name: 'Insert Counter',
    editorCallback: (editor: Editor) => {
        editor.replaceRange(createYamlCodeBlock(OPK_COUNTER, {
            id: v4(),
            title: 'Your title',
            value: 0,
        } as Counter),
            editor.getCursor()
        )
    }
}

export const addSurveyJournal: Command = {
    id: 'opk-insert-survey-journal',
    name: 'Insert Survey Journal',
    editorCallback: (editor: Editor) => {
        editor.replaceRange(createJsonCodeBlock(JSON_LANG, {
            type: SURVEY_JOURNAL,
            id: v4(),
            name: 'Your title',
            questions: [
                {
                    type: 'your-q-type',
                    text: 'Your question is?',
                    options: [
                        {
                            type: 'your-o-type',
                            text: 'Your answer'
                        }
                    ]
                }
            ],
            days: []
        } as SurveyJournal),
            editor.getCursor()
        )
    }
}