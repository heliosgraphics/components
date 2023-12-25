import React, { useMemo } from "react";
import styles from "./Dot.module.css";
import { getUUID } from "@heliosgraphics/utils/uuid";
import { getColor } from "../utils/color";
import type { DotProps } from "./Dot.types";

const Dot: React.FC<DotProps> = ({ colorAccent, size = 8, color = "blue" }) => {
	const dotId: string = useMemo(() => getUUID(), []);
	const dotColor: string = getColor(color) as string;
	const dotColorAccent: string = useMemo(
		() => getColor(colorAccent, undefined, dotColor),
		[colorAccent, dotColor],
	) as string;

	const dotStyle = {
		height: size + "px",
		maxHeight: size + "px",
		maxWidth: size + "px",
		width: size + "px",
	};

	return (
		<div className={styles.dot} style={dotStyle}>
			<svg width="100%" height="100%" className={dotColor} viewBox="0 0 20 20">
				<linearGradient id={dotId}>
					<stop stopColor={`var(--${dotColorAccent})`} offset="0%" />
					<stop stopColor={`var(--${dotColor})`} offset="100%" />
				</linearGradient>
				<circle fill={`url(#${dotId})`} cx={10} cy={10} r={10} />
			</svg>
		</div>
	);
};

export default Dot;
