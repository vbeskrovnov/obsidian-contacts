import * as React from "react";
import { openFile } from "src/file/file";
import { Contact } from "src/parse/contact";

type ContactProps = {
	contact: Contact;
};

export const ContactView = (props: ContactProps) => {
	const contact = props.contact;
	return (
		<div>
			<p onClick={() => openFile(contact.file)}>
				{contact.name} {contact.lastName}
			</p>
		</div>
	);
};
