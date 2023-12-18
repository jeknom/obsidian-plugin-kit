import { Plugin } from 'obsidian';
import { JSON_LANG, OPK_COUNTER } from 'src/constants/codeBlockLang';
import * as commands from './src/commands'
import { counterBlock, surveyJournalBlock } from 'src/mdCodeBlockProcessors';
import { YamlTypeSchema } from 'src/types';
import { SURVEY_JOURNAL } from 'src/constants/dataType';

// Remove once settings are implemented
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OPKSettings {
}

const DEFAULT_SETTINGS: OPKSettings = {
}

export default class MyPlugin extends Plugin {
	settings: OPKSettings = DEFAULT_SETTINGS;

	async onload() {
		await this.loadSettings();

		for (const command of Object.values(commands)) {
			this.addCommand(command)
		}

		this.registerMarkdownCodeBlockProcessor(
			OPK_COUNTER,
			async (source, el, { sourcePath }) => await counterBlock(source, sourcePath, this.app, el))
		
		this.registerMarkdownCodeBlockProcessor(
			JSON_LANG,
			async (source, el, { sourcePath }) => {
				const validation = YamlTypeSchema.safeParse(JSON.parse(source))
				if (validation.success) {
					switch (validation.data.type) {
						case SURVEY_JOURNAL:
							await surveyJournalBlock(source, sourcePath, this.app, el)
							break
					}
				}
			})
	}

	onunload() {
		// Obsidian unload method
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
