import { App } from 'obsidian';
import * as React from "react";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const AppContext = React.createContext<App>(undefined!);