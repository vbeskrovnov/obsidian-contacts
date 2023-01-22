import { MetadataCache, TFile, Vault } from "obsidian";
import { Contact } from "./contact";
import { isContactFile as isContactFormatFile, parseContactData as parseContactFormatData } from "./custom_format_parser";
import { isContactFile as isFrontmatterFormatFile, parseContactData as parseFrontmatterFormatData } from "./front_matter_format_parser";

export async function parseContactFiles(files: TFile[], vault: Vault, metadataCache: MetadataCache) {
  const contactsData: Contact[] = [];
  for (const file of files) {
    if (isFrontmatterFormatFile(file, metadataCache)) {
      const contact = await parseFrontmatterFormatData(file, metadataCache);
      if (!contact) {
        continue;
      }
      contactsData.push(contact);
    } else if (await isContactFormatFile(file, vault)) {
      const contact = await parseContactFormatData(file, vault);
      if (!contact) {
        continue;
      }
      contactsData.push(contact);
    }
  }
  return contactsData;
}