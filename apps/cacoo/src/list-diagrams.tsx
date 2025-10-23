import { Grid, getPreferenceValues } from "@raycast/api";
import { useCachedPromise, useCachedState } from "@raycast/utils";
import { useState } from "react";
import { getDiagrams, getOrganizations } from "./api/cacoo";
import { ListDiagrams } from "./components/ListDiagrams";

export default function Command() {
	const [keyword, setKeyword] = useState("");
	const [organizationKey, setOrganizationKey] = useCachedState<string | null>(
		"organization-id",
		null,
	);

	const { isLoading: isLoadingOrganizations, data: organizations } =
		useCachedPromise(
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

	const { isLoading: isLoadingDiagrams, data: diagrams } = useCachedPromise(
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
		<ListDiagrams
			organizations={organizations}
			diagrams={diagrams}
			isLoading={isLoadingOrganizations || isLoadingDiagrams}
			organizationKey={organizationKey}
			keyword={keyword}
			onChangeOrganizationKey={setOrganizationKey}
			onChangeKeyword={setKeyword}
		/>
	);
}
