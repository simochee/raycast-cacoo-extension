import { Action, ActionPanel, Detail, Grid } from "@raycast/api";
import { type FC, useState } from "react";
import {
	type GetDiagramsResponse,
	type GetOrganizationsResponse,
	withApiKey,
} from "../api/cacoo";
import { DiagramDetail } from "./DiagramDetail";

type Props = {
	organizations: GetOrganizationsResponse["result"];
	diagrams: GetDiagramsResponse["result"];
	isLoading: boolean;
	organizationKey: string | null;
	keyword: string;
	onChangeOrganizationKey: (organizationKey: string) => void;
	onChangeKeyword: (keyword: string) => void;
};

export const ListDiagrams: FC<Props> = ({
	organizations,
	diagrams,
	isLoading,
	organizationKey,
	keyword,
	onChangeOrganizationKey,
	onChangeKeyword,
}) => {
	return (
		<Grid
			isLoading={isLoading}
			throttle
			searchText={keyword}
			onSearchTextChange={onChangeKeyword}
			pagination={{
				hasMore: true,
				onLoadMore() {
					console.log("load more...");
				},
				pageSize: 25,
			}}
			searchBarAccessory={
				<Grid.Dropdown
					tooltip="Organizations"
					value={organizationKey}
					onChange={onChangeOrganizationKey}
				>
					{organizations.map((organization) => (
						<Grid.Dropdown.Item
							key={organization.id}
							title={organization.name}
							value={organization.key}
						/>
					))}
				</Grid.Dropdown>
			}
		>
			{diagrams.map((diagram) => (
				<Grid.Item
					key={diagram.diagramId}
					id={diagram.diagramId}
					title={diagram.title}
					subtitle={diagram.description}
					content={withApiKey(diagram.imageUrlForApi)}
					accessory={{
						icon: diagram.owner.imageUrl,
						tooltip: diagram.owner.nickname,
					}}
					actions={
						<ActionPanel>
							<Action.Push
								title="Show Diagrams"
								target={<DiagramDetail diagram={diagram} />}
							/>
							<Action.OpenInBrowser title="Open Diagram" url={diagram.url} />
						</ActionPanel>
					}
				/>
			))}
		</Grid>
	);
};
