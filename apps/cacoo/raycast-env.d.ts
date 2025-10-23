/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
	/** API Key - Your Cacoo API Key */
	apiKey: string;
};

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences;

declare namespace Preferences {
	/** Preferences accessible in the `list-diagrams` command */
	export type ListDiagrams = ExtensionPreferences & {};
}

declare namespace Arguments {
	/** Arguments passed to the `list-diagrams` command */
	export type ListDiagrams = {};
}
