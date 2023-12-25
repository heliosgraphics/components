import React from "react";
import { Masonry } from "react-plock";
import type { MasonryProps } from "./Masonry.types";

const MasonryLayout: React.FC<MasonryProps> = ({ children }) => {
	if (!children) return null;

	const mappedChildren: Array<JSX.Element> | null | undefined = React.Children.map(children, (child) => (
		<div className="Row">{child}</div>
	));

	return (
		<Masonry
			items={mappedChildren as Array<JSX.Element>}
			render={(item: any) => item}
			config={{
				columns: [3, 3, 3],
				gap: [4, 4, 4],
				media: [480, 640, 960],
			}}
		/>
	);
};

export default MasonryLayout;
