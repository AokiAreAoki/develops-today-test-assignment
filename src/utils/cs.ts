export default function cs(classnames: (string | false | null | undefined)[]) {
	return classnames.filter(Boolean).join(" ");
}
