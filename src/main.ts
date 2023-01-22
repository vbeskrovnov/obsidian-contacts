import { Plugin } from 'obsidian';
import { ContactsView } from "src/ui/sidebar/sidebarView";
import { CONTACTS_VIEW_CONFIG } from "src/util/constants";
import { ContactsPluginSettings, ContactsSettingTab, DEFAULT_SETTINGS } from './settings/settings';

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
