import * as React from "react";
import { openFile } from "src/file/file";
import { Contact } from "src/parse/contact";
import { daysUntilBirthday, diffDateToday } from "src/util/dates";

type ContactProps = {
	contact: Contact;
};

export const ContactView = (props: ContactProps) => {
	const contact = props.contact;
	return (
		<div className="contact-card" onClick={() => openFile(contact.file)}>
			<div className="content">
				<div className="name">
					{contact.name} {contact.lastName}
				</div>
				{contact.lastContact && (
					<div className="lastContact">
						Last contact: {diffDateToday(contact.lastContact)} days ago
					</div>
				)}
				{contact.birthday && (
					<div className="lastContact">
						Birthday: in {daysUntilBirthday(contact.birthday)} days
					</div>
				)}
			</div>
		</div>
	);
};
