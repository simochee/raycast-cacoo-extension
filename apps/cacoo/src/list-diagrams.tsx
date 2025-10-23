import { Grid, getPreferenceValues } from "@raycast/api";
import { useCachedPromise, useCachedState } from "@raycast/utils";
import { useState } from "react";
import { getDiagrams, getOrganizations } from "./api/cacoo";

export default function ListDiagrams() {
	const [keyword, setKeyword] = useState("");
	const [organizationKey, setOrganizationKey] = useCachedState<string | null>(
		"organization-id",
		null,
	);

	const { apiKey } = getPreferenceValues<{ apiKey: string }>();

	const { data: organizations } = useCachedPromise(
		async () => {
			const { result } = await getOrganizations();

			if (!organizationKey) {
				setOrganizationKey(result[0].key || null);
			}

			return result;
		},
		[],
		{
			initialData: [],
		},
	);

	const { isLoading, data: diagrams } = useCachedPromise(
		async (organizationKey: string | null, keyword: string) => {
			if (!organizationKey) return [];

			const { result } = await getDiagrams({
				organizationKey,
				keyword,
			});

			return result;
		},
		[organizationKey, keyword],
		{
			initialData: [],
		},
	);

	return (
		<Grid
			isLoading={isLoading}
			throttle
			onSearchTextChange={setKeyword}
			searchBarAccessory={
				<Grid.Dropdown tooltip="Organizations">
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
			{diagrams.map((item) => (
				<Grid.Item
					key={item.diagramId}
					title={item.title}
					subtitle={item.description}
					content={`${item.imageUrlForApi}?apiKey=${apiKey}`}
					accessory={{
						icon: item.owner.imageUrl,
						tooltip: item.owner.nickname,
					}}
				/>
			))}
		</Grid>
	);
}
