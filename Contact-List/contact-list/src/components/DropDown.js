import { useState } from "react";

function DropDown({ categories, onChange, text }) {
	const [isOpen, setIsOpen] = useState(false);
	const [currentTag, setCurrentTag] = useState("");

	const handleClick = (e) => {
		e.preventDefault();
		setIsOpen(!isOpen);
	};

	const handleOptionClick = (e, option) => {
		e.preventDefault();
		setCurrentTag(option.value);
		onChange(option.value);
		setIsOpen(false);
	};

	const renderedOptions = categories.map((option) => {
		return (
			<div
				key={option.label}
				onClick={(e) => handleOptionClick(e, option)}
			>
				{option.label}
			</div>
		);
	});

	return (
		<div className="dropdown is-active">
			<div className="dropdown-trigger">
				<button
					className="button"
					aria-haspopup="true"
					aria-controls="dropdown-menu"
					onClick={(e) => handleClick(e)}
				>
					<span>{currentTag ? currentTag : text}</span>
					<span className="icon is-small">
						<i className="fas fa-angle-down" aria-hidden="true"></i>
					</span>
				</button>
			</div>
			<div className="dropdown-menu" id="dropdown-menu" role="menu">
				<div className="dropdown-content">
					{isOpen && renderedOptions}
				</div>
			</div>
		</div>
	);
}

export default DropDown;

/**
 * <div>
			<div onClick={handleClick}> {tag || "Select.."} </div>
			{isOpen && <div>{renderedOptions}</div>}
		</div>
 */
