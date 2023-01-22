import { TFile, Vault } from "obsidian";
import { Contact } from "./contact";
import { parseDate } from "./parse_utils";

export async function isContactFile(
  file: TFile, vault: Vault
): Promise<boolean> {
  const content = await vault.cachedRead(file);
  return (content.match(/\/---contact---\//g) || []).length === 2;
}

export async function parseContactData(file: TFile, vault: Vault): Promise<Contact | null> {
  const fileContents = await vault.cachedRead(file);
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
    birthday: parseDate(contactsDict['Birthday']),
    file: file,
  }
}