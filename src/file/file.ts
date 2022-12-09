import { TFile } from "obsidian";

export async function openFile(file: TFile) {
  const { workspace } = window.app;
  const leaf = workspace.getLeaf()
  await leaf.openFile(file, { active: true });
}