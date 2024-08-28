import Link from "next/link";
import { FC, PropsWithChildren } from "react";
import cs from "../../utils/cs";

type LinkProps = Pick<Parameters<typeof Link>[0], "href">;

interface Props extends LinkProps, PropsWithChildren {
	disabled?: boolean;
}

const CustomLink: FC<Props> = ({ href, disabled, children }) => (
	<Link
		href={href}
		aria-disabled={disabled}
		className={cs([
			disabled && "text-gray-400 cursor-not-allowed",
			"flex-shrink px-2 py-0.5 bg-gray-300 rounded-lg overflow-hidden",
		])}
	>
		{children}
	</Link>
);

export default CustomLink;
