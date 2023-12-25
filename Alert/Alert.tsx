import React from "react";
import Button from "../Button/Button";
import classNames from "@sindresorhus/class-names";
import Flex from "../Flex/Flex";
import Icon from "../Icon/Icon";
import Text from "../Text/Text";
import styles from "./Alert.module.css";
import type { AlertProps } from "./Alert.types";
import type { FUIColorScale, FUIColors } from "@heliosgraphics/library/types/colors";
import type { HeliosIntentType } from "@heliosgraphics/library/types/intent";

const ALERT_BUTTON_COLORS: Record<HeliosIntentType, FUIColorScale> = {
	error: "red",
	note: "gray",
	success: "green",
	info: "blue",
	warning: "orange",
};

const Alert: React.FC<AlertProps> = ({ children, onClose, title, icon, type }) => {
	const alertColor: FUIColorScale = ALERT_BUTTON_COLORS[type];
	const alertIconColor: FUIColors = ALERT_BUTTON_COLORS[type];

	const alertClasses: string = classNames(styles.alert, "radius-2 p-4", {
		[styles.alertError]: type === "error",
		[styles.alertInfo]: type === "info",
		[styles.alertSuccess]: type === "success",
		[styles.alertNote]: type === "note",
		[styles.alertWarning]: type === "warning",
	});

	return (
		<Flex className={alertClasses} padding={6} gap={6}>
			{!!icon && <Icon name={icon} size={20} color={alertIconColor} />}
			<Flex isColumn={true} gap={0} className="grow-1" isXCentered={true}>
				{!!title && (
					<Text type="small" color="currentcolor" fontWeight="semibold">
						{title}
					</Text>
				)}
				<Text type="tiny" color="currentcolor">
					{children}
				</Text>
			</Flex>
			{!!onClose && <Button isIconOnly={true} color={alertColor} value="Close" type="primary" size="tiny" icon="x" />}
		</Flex>
	);
};

export default Alert;
