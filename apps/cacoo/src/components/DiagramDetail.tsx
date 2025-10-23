import { Action, ActionPanel, Detail } from "@raycast/api";
import { useCachedPromise } from "@raycast/utils";
import type { FC } from "react";
import {
	type GetDiagramsResponse,
	getDiagramById,
	withApiKey,
} from "../api/cacoo";

type Props = {
	diagram: GetDiagramsResponse["result"][number];
};

export const DiagramDetail: FC<Props> = ({ diagram }) => {
	const { isLoading, data } = useCachedPromise(
		async (diagramId: string) => {
			return getDiagramById({ diagramId });
		},
		[diagram.diagramId],
	);

	const markdown = data?.sheets
		.map(({ name, url, imageUrlForApi }, i) =>
			[`[${name}](${url})`, `![${name}](${withApiKey(imageUrlForApi)})`].join(
				"  \n",
			),
		)
		.join("\n\n---\n\n");

	return (
		<Detail
			isLoading={isLoading}
			navigationTitle={diagram.title}
			markdown={markdown}
			actions={
				<ActionPanel>
					<Action.OpenInBrowser title="Open Diagram" url={diagram.url} />
					<Action.CopyToClipboard
						title="Copy Diagram URL"
						content={diagram.url}
						shortcut={{ modifiers: ["cmd"], key: "u" }}
					/>
				</ActionPanel>
			}
		/>
	);
};
