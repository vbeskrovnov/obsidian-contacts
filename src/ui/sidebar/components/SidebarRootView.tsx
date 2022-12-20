import { normalizePath, TFile, TFolder } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { findContactFiles } from "src/file/file";
import { Contact } from "src/parse/contact";
import { parseContactFiles } from "src/parse/parse";
import { Sort } from "src/util/constants";
import { ContactsListView } from "./ContactsListView";
import { HeaderView } from "./HeaderView";

export const SidebarRootView = () => {
	const { vault } = useApp();
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const [sort, setSort] = React.useState<Sort>(Sort.LAST_CONTACT);
	const folder = "03 - Личное/Contacts";

	React.useEffect(() => {
		const contactsFolder = vault.getAbstractFileByPath(
			normalizePath(folder)
		) as TFolder;

		if (!contactsFolder) {
			throw new Error("Failed to find contacts folder");
		}

		const contactFiles: TFile[] = findContactFiles(contactsFolder);

		parseContactFiles(contactFiles).then((contactsData) =>
			setContacts(contactsData)
		);
	}, []);

	return (
		<div>
			<HeaderView onSortChange={setSort} sort={sort} />
			<ContactsListView contacts={contacts} sort={sort} />
		</div>
	);
};
