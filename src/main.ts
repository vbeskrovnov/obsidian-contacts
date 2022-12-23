import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { ContactsView } from "src/ui/sidebar/sidebarView";
import { CONTACTS_VIEW_CONFIG } from "src/util/constants";

interface ContactsPluginSettings {
	contactsFolder: string;
}

const DEFAULT_SETTINGS: ContactsPluginSettings = {
	contactsFolder: '/'
}

export default class ContactsPlugin extends Plugin {
	settings: ContactsPluginSettings;

	async onload() {
		await this.loadSettings();
		this.registerView(
			CONTACTS_VIEW_CONFIG.type,
			(leaf) => new ContactsView(leaf, this)
		);

		this.addRibbonIcon('contact', 'Contacts', () => {
			this.activateSidebarView();
		});

		this.addSettingTab(new ContactsSettingTab(this.app, this));
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(CONTACTS_VIEW_CONFIG.type);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async activateSidebarView() {
		this.app.workspace.detachLeavesOfType(CONTACTS_VIEW_CONFIG.type);

		await this.app.workspace.getRightLeaf(false).setViewState({
			type: CONTACTS_VIEW_CONFIG.type,
			active: true,
		});

		this.app.workspace.revealLeaf(
			this.app.workspace.getLeavesOfType(CONTACTS_VIEW_CONFIG.type)[0]
		);
	}
}

class ContactsSettingTab extends PluginSettingTab {
	plugin: ContactsPlugin;

	constructor(app: App, plugin: ContactsPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Settings for "Contacts" plugin.' });

		new Setting(containerEl)
			.setName('Contacts folder location')
			.setDesc('Files in this folder and all subfolders will be available as contacts')
			.addText(text => text
				.setPlaceholder('Personal/Contacts')
				.setValue(this.plugin.settings.contactsFolder)
				.onChange(async (value) => {
					this.plugin.settings.contactsFolder = value;
					await this.plugin.saveSettings();
				}));
	}
}
