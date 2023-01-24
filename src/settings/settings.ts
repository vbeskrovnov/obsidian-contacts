import { App, PluginSettingTab, Setting } from "obsidian";
import ContactsPlugin from "src/main";

export interface ContactsPluginSettings {
  contactsFolder: string;
  template: Template;
}

export enum Template {
  CUSTOM = "custom", FRONTMATTER = "frontmatter"
}

export const DEFAULT_SETTINGS: ContactsPluginSettings = {
  contactsFolder: '/',
  template: Template.CUSTOM
}

export class ContactsSettingTab extends PluginSettingTab {
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

    new Setting(containerEl)
      .setName('Contact file template')
      .setDesc('Template to be used when creating a new contact file')
      .addDropdown(dropdown => dropdown
        .addOption(Template.CUSTOM, "Custom")
        .addOption(Template.FRONTMATTER, "Frontmatter (YAML Metadata)")
        .setValue(this.plugin.settings.template)
        .onChange(async (value) => {
          this.plugin.settings.template = value as Template;
          await this.plugin.saveSettings();
        }));
  }
}