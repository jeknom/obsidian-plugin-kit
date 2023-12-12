import { Notice, Plugin } from 'obsidian';
import { OPK_COUNTER } from 'src/constants/codeBlockLang';
import { CounterSchema } from 'src/types';
import { parse, stringify } from 'yaml'
import Counter from './src/components/Counter.svelte'
import * as commands from './src/commands'
import fs from 'fs/promises'

// Remove once settings are implemented
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface OPKSettings {
}

const DEFAULT_SETTINGS: OPKSettings = {
}

export default class MyPlugin extends Plugin {
	settings: OPKSettings = DEFAULT_SETTINGS;

	async updateCounterBlock(path: string) {
		const file = await fs.readFile(path)
		console.log({ path, file })
		
	}


	async onload() {
		await this.loadSettings();

		for (const command of Object.values(commands)) {
			this.addCommand(command)
		}

		this.registerMarkdownCodeBlockProcessor(OPK_COUNTER, async (source, el, { sourcePath }) => {
			try {
				const obj = parse(source)
				const counter = CounterSchema.parse(obj)
				
				const onUpdateCount = async (newCount: number) => {
					const content = await this.app.vault.adapter.read(sourcePath)
					const counterCopy = structuredClone(counter)
					counterCopy.value = newCount
					const counterYaml = stringify(counterCopy)
					const newContent = content.replace(source, counterYaml)

					await this.app.vault.adapter.write(sourcePath, newContent)
				}

				new Counter({
					target: el,
					props: {
						title: counter.title,
						value: counter.value,
						onChange: async (e: number) => onUpdateCount(e)
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
