import { randomUUID } from "crypto";
import * as React from "react";
import { Contact } from "src/parse/contact";
import { Sort } from "src/util/constants";
import { compareDatesOrNull as compareDatesOrUndefined } from "src/util/dates";
import { ContactView } from "./ContactView";

type ContactsListProps = {
	contacts: Contact[];
	sort: Sort;
};

export const ContactsListView = (props: ContactsListProps) => {
	const [processedContacts, setProcessedContacts] = React.useState<Contact[]>(
		[]
	);

	const contacts = props.contacts;
	const sort = props.sort;

	React.useEffect(() => {
		const sortedContacts = [...contacts].sort((a, b) => {
			switch (sort) {
				case Sort.NAME:
					return (a.name + a.lastName).localeCompare(b.name + b.lastName);
				case Sort.LAST_CONTACT:
					return compareDatesOrUndefined(a.lastContact, b.lastContact);
				default:
					return 0;
			}
		});
		setProcessedContacts(sortedContacts);
	}, [contacts, sort]);

	return (
		<>
			{processedContacts.map((contact) => {
				return <ContactView contact={contact} key={randomUUID()} />;
			})}
		</>
	);
};
