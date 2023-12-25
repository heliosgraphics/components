import React from "react";
import { ButtonGroupProps } from "./ButtonGroup.types";
import classNames from "@sindresorhus/class-names";
import Flex from "../Flex";
import styles from "./ButtonGroup.module.css";

const ButtonGroup: React.FC<ButtonGroupProps> = ({ className, children, isVertical, align = "left" }) => {
	const buttonGroupClasses: string = classNames(className, {
		[styles.buttonGroupLeft]: align === "left",
		[styles.buttonGroupCenter]: align === "center",
		[styles.buttonGroupRight]: align === "right",
		[styles.buttonGroupJoin]: align === "join",
		[styles.buttonGroupVertical]: isVertical,
		[styles.buttonGroupHorizontal]: !isVertical,
	});

	return (
		<Flex className={buttonGroupClasses} gap={4} isYCentered={true} data-component="ButtonGroup" isWrapping={true}>
			{children}
		</Flex>
	);
};

export default ButtonGroup;
