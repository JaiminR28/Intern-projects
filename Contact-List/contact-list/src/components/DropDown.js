import { useState } from "react";

function DropDown({ categories, tag, onChange }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = (option) => {
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (option) => {
		onChange(option.value);
		setIsOpen(false);
	};

	const renderedOptions = categories.map((option) => {
		return (
			<div key={option.label} onClick={() => handleOptionClick(option)}>
				{option.label}
			</div>
		);
	});

	return (
		<div>
			<div onClick={handleClick}> {tag || "Select.."} </div>
			{isOpen && <div>{renderedOptions}</div>}
		</div>
	);
}

export default DropDown;
