import { normalizePath, TAbstractFile, TFile, TFolder } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { createContactFile, findContactFiles } from "src/file/file";
import ContactsPlugin from "src/main";
import { Contact } from "src/parse/contact";
import { parseContactFiles } from "src/parse/parse";
import { Sort } from "src/util/constants";
import { ContactsListView } from "./ContactsListView";
import { HeaderView } from "./HeaderView";

type RootProps = {
	plugin: ContactsPlugin;
};

export const SidebarRootView = (props: RootProps) => {
	const { vault, metadataCache, workspace } = useApp();
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const [sort, setSort] = React.useState<Sort>(Sort.LAST_CONTACT);
	const folder = props.plugin.settings.contactsFolder;

	const isFileInFolder = (file: TAbstractFile) => {
		return file.path.startsWith(folder);
	};

	const parseContacts = () => {
		const contactsFolder = vault.getAbstractFileByPath(
			normalizePath(folder)
		) as TFolder;

		if (!contactsFolder) {
			setContacts([]);
		}

		const contactFiles: TFile[] = findContactFiles(contactsFolder);

		parseContactFiles(contactFiles, vault, metadataCache).then((contactsData) =>
			setContacts(contactsData)
		);
	};

	React.useEffect(() => {
		parseContacts();
	}, []);

	React.useEffect(() => {
		const updateFiles = (file: TAbstractFile) => {
			if (isFileInFolder(file)) {
				parseContacts();
			}
		};

		vault.on("create", updateFiles);
		vault.on("modify", updateFiles);
		vault.on("rename", updateFiles);
		vault.on("delete", updateFiles);

		return () => {
			vault.off("create", updateFiles);
			vault.off("modify", updateFiles);
			vault.off("rename", updateFiles);
			vault.off("delete", updateFiles);
		};
	}, [vault, folder]);

	return (
		<div>
			<HeaderView
				onSortChange={setSort}
				onCreateContact={() =>
					createContactFile(
						folder,
						props.plugin.settings.template,
						props.plugin.settings.defaultHashtag,
						vault,
						workspace
					)
				}
				sort={sort}
			/>
			<ContactsListView contacts={contacts} sort={sort} />
		</div>
	);
};
