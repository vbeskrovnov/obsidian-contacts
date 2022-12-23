import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { AppContext } from "src/context/context";
import ContactsPlugin from "src/main";
import { CONTACTS_VIEW_CONFIG } from "src/util/constants";
import { SidebarRootView } from "./components/SidebarRootView";

export class ContactsView extends ItemView {
	root = createRoot(this.containerEl.children[1]);
	plugin: ContactsPlugin;

	constructor(leaf: WorkspaceLeaf, plugin: ContactsPlugin) {
		super(leaf);
		this.plugin = plugin;
	}
	getViewType(): string {
		return CONTACTS_VIEW_CONFIG.type;
	}

	getDisplayText(): string {
		return CONTACTS_VIEW_CONFIG.name;
	}

	getIcon(): string {
		return CONTACTS_VIEW_CONFIG.icon;
	}

	async onOpen() {
		this.root.render(
			<AppContext.Provider value={this.app}>
				<SidebarRootView plugin={this.plugin} />
			</AppContext.Provider>
		);
	}

	async onClose() {
		this.root.unmount();
	}
}
