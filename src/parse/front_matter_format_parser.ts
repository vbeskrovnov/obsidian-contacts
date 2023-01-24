import { MetadataCache, TFile } from "obsidian";
import { Contact } from "./contact";
import { parseDate } from "./parse_utils";

export function isContactFile(
  file: TFile, metadataCache: MetadataCache
): boolean {
  const type = metadataCache.getFileCache(file)?.frontmatter?.type;
  return type == 'contact';
}

export async function parseContactData(file: TFile, metadataCache: MetadataCache): Promise<Contact | null> {
  const frontmatter = metadataCache.getFileCache(file)?.frontmatter;
  if (frontmatter == null) {
    return null;
  }

  return {
    name: frontmatter['name']['first'],
    lastName: frontmatter['name']['last'],
    phone: frontmatter['phone'],
    lastContact: parseDate(frontmatter['last_chat']),
    birthday: parseDate(frontmatter['birthday']),
    file: file,
  }
}