"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Dialog.module.css";
import Flex from "../Flex";
import Link from "next/link";
import Button from "../Button";
import ButtonGroup from "../ButtonGroup";
import classNames from "@sindresorhus/class-names";
import Heading from "../Heading";
// TODO @chrispuska Should use framer instead.
import { animated } from "@react-spring/web";
import type { DialogProps } from "./Dialog.types";

const ATTRIBUTE_SCROLL = "data-scroll" as const;
const POSITION_FIXED_CLASS = "fixed" as const;

const Dialog: React.FC<DialogProps> = ({ title, children, permalink, isOpen, onClose }) => {
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	const resetScroll = () => {
		globalThis?.requestAnimationFrame(() => {
			document.body.setAttribute(ATTRIBUTE_SCROLL, "");
			dialogRef?.current?.scrollTo?.(0, 0);
		});
	};

	const resetDocumentStyle = (scrollPosition: number): void => {
		globalThis?.requestAnimationFrame(() => {
			document.body.style.position = "";
			document.body.style.height = "";
			document.body.style.top = "";
			document.body.classList.remove(POSITION_FIXED_CLASS);

			return globalThis?.scrollTo?.(0, scrollPosition);
		});
	};

	// Make sure it's scrollable if closed with push
	useEffect(() => {
		return () => {
			resetDocumentStyle(0);
			resetScroll();
		};
	}, [title]);

	// Setup ope and close
	useEffect(() => {
		// Dialog to top
		dialogRef?.current?.scrollTo?.(0, 0);

		if (isOpen) {
			// There might be multiple Dialogs, but only the latest one gets to write to document
			const localPosition: number = document?.documentElement?.scrollTop ?? 0;

			// Disable scrolling
			document.body.classList.add(POSITION_FIXED_CLASS);

			// Keep track of scroll position
			document.body.style.top = `-${localPosition}px`;
			document.body.setAttribute(ATTRIBUTE_SCROLL, localPosition.toString());

			// Show modal
			dialogRef?.current?.showModal?.();
		} else if (!dialogRef?.current) {
			const localPos: string = document?.body?.getAttribute(ATTRIBUTE_SCROLL) ?? "0";
			const scrollPosition: number = parseInt(localPos) ?? 0;

			document.body.classList.remove(POSITION_FIXED_CLASS);

			// Reset document style, and scroll back
			resetDocumentStyle(scrollPosition);

			// Close modal
			dialogRef?.current?.close?.();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const onDialogClose = (event) => {
		const isDialog = event?.target?.tagName === "DIALOG";

		return isDialog && onClose();
	};

	const dialogClasses: string = classNames(styles.dialog, "shadow-1");

	return (
		<animated.dialog ref={dialogRef} className={dialogClasses} onClick={onDialogClose}>
			<Flex
				isBetween={true}
				isYCentered={true}
				padding={8}
				tabIndex={0}
				className={`${styles.dialog__header} sticky top-0 z-10 glass-1`}
			>
				{!!title ? (
					<Heading level={4} fontWeight="normal">
						{title}
					</Heading>
				) : permalink ? (
					<ButtonGroup>
						<Link href={permalink}>
							<Button icon="link" type="secondary" value="Permalink" size="small" />
						</Link>
					</ButtonGroup>
				) : (
					<div />
				)}
				<ButtonGroup>
					<Button icon="x" type="secondary" value="" onClick={onClose} size="small" isIconOnly={true} color="gray" />
				</ButtonGroup>
			</Flex>
			{isOpen && <div className={`${styles.dialog__content}`}>{children}</div>}
		</animated.dialog>
	);
};

export default Dialog;
