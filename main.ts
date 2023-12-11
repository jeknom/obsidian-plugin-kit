import { Notice, Plugin } from 'obsidian';
import { OPK_COUNTER } from 'src/constants/codeBlockLang';
import { CounterSchema } from 'src/types/Counter';
import { parse } from 'yaml'
import Counter from './src/components/Counter.svelte'

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
		this.registerMarkdownCodeBlockProcessor(OPK_COUNTER, (source, el, ctx) => {
			try {
				const obj = parse(source)
				const counter = CounterSchema.parse(obj)

				new Counter({
					target: el,
					props: {
						title: counter.title,
						value: counter.value,
						onChange: console.log
					}
				})

			} catch (error) {
				new Notice('Failed to parse counter')
			}
		})
	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
