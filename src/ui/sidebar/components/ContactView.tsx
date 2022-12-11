import * as React from "react";
import { openFile } from "src/file/file";
import { Contact } from "src/parse/contact";

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
						Last contact: {diffDate(contact.lastContact)} days ago
					</div>
				)}
			</div>
		</div>
	);
};

function diffDate(date: Date): number {
	const oneDay = 24 * 60 * 60 * 1000;
	const today = new Date();

	const diffDays = Math.round(
		Math.abs((today.getTime() - date.getTime()) / oneDay)
	);
	return diffDays;
}
