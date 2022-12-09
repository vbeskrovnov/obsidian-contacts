import { randomUUID } from "crypto";
import { normalizePath, TFile, TFolder, Vault } from "obsidian";
import * as React from "react";
import { useApp } from "src/context/hooks";
import { Contact } from "src/parse/contact";
import { parseContactData } from "src/parse/parse";
import { ContactView } from "./ContactView";

export const SidebarRootView = () => {
	const { vault } = useApp();
	const [contacts, setContacts] = React.useState<Contact[]>([]);
	const folder = "03 - Личное/Contacts";

	React.useEffect(() => {
		const contactsFolder = vault.getAbstractFileByPath(
			normalizePath(folder)
		) as TFolder;

		if (!contactsFolder) {
			throw new Error("Failed to find contacts folder");
		}
		const contactsData: Contact[] = [];
		Vault.recurseChildren(contactsFolder, async (contactNote) => {
			if (contactNote instanceof TFile) {
				const contact = await parseContactData(contactNote);
				if (contact) {
					contactsData.push(contact);
				}
			}
		});
		setContacts(contactsData);
	}, []);

	return (
		<div>
			{contacts.map((contact) => (
				<ContactView contact={contact} key={randomUUID()} />
			))}
		</div>
	);
};
