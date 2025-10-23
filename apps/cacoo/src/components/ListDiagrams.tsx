import { Grid } from "@raycast/api";
import type { FC } from "react";
import {
	type GetDiagramsResponse,
	type GetOrganizationsResponse,
	withApiKey,
} from "../api/cacoo";

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
					title={diagram.title}
					subtitle={diagram.description}
					content={withApiKey(diagram.imageUrlForApi)}
					accessory={{
						icon: diagram.owner.imageUrl,
						tooltip: diagram.owner.nickname,
					}}
				/>
			))}
		</Grid>
	);
};
