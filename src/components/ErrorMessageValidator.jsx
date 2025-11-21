export const ErrorMessageValidator = ({ message, bg = null }) => {
	return (
		<span
			className={`block text-sm text-red-900 text-start font-bold ${bg !== null && "bg-white md:col-span-2"}`}
		>
			{message}
		</span>
	);
};
