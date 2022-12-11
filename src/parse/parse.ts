import { TFile } from "obsidian";
import { Contact } from "./contact";

export async function parseContactData(file: TFile): Promise<Contact | null> {
  const { vault } = window.app;
  const fileContents = await vault.cachedRead(file);
  if (!isContactFile(fileContents)) {
    return null;
  }
  const regexpNames = /^\|(?<key>.+)\|(?<value>.+)\|$/gm;
  const contactsDict: { [key: string]: string } = {};
  for (const match of fileContents.matchAll(regexpNames)) {
    if (!match.groups) {
      continue;
    }
    const key = match.groups.key.trim()
    const value = match.groups.value.trim()
    if (key === "" || value === "") {
      continue;
    }
    contactsDict[key] = value;
  }

  return {
    name: contactsDict['Name'],
    lastName: contactsDict['Last Name'],
    phone: contactsDict['Phone'],
    lastContact: parseDate(contactsDict['Last chat']),
    file: file,
  }
}

function parseDate(value: string): Date | undefined {
  if (!value) {
    return undefined;
  }
  const parsedDate = value.match(/(\[\[)?(?<date>[0-9-]+)(\]\])?/)
  if (!parsedDate || !parsedDate.groups) {
    return undefined;
  }
  return new Date(parsedDate.groups['date']);
}

function isContactFile(
  content: string,
): boolean {
  return (content.match(/\/---contact---\//g) || []).length === 2;
}