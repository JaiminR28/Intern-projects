// Implementing Memoization in Js.
// Memoizztion is an optimization technique that can be used to reduce
// time-consuming calculations by saving previous input to something called cache and
// returning the result from it.

import { useMemo, useState } from "react";

function Memoization() {
	// let sum = 0;
	// const calc = (n) => {
	// 	for (let i = 0; i <= n; i++) {
	// 		sum += i;
	// 	}
	// 	return sum;
	// };

	// const memoize = (fun) => {
	// 	let cache = {};

	// 	return function (...args) {
	// 		let n = args[0];

	// 		if (n in cache) {
	// 			console.log("cache");
	// 			return cache[n];
	// 		} else {
	// 			console.log("Calculating for the first time");
	// 			let result = fun(n);
	// 			cache[n] = result;
	// 			return result;
	// 		}
	// 	};
	// };

	// const efficient = memoize(calc);

	// console.time();
	// console.log(efficient(5));
	// console.timeEnd();

	// console.time();
	// console.log(efficient(5));
	// console.timeEnd();

	const [counterOne, setCounterOne] = useState(0);
	const [counterTwo, setCounterTwo] = useState(0);

	const IncrementOne = () => {
		setCounterOne(counterOne + 1);
	};
	const IncrementTwo = () => {
		setCounterTwo(counterTwo + 2);
	};

	const isEven = useMemo(() => {
		console.warn(".........");
		let i = 0;
		while (i < 2000000000) i++;
		return counterOne % 2 === 0;
	}, [counterOne]);

	return (
		<div>
			<button onClick={IncrementOne}>Counter 1 - {counterOne}</button>
			<span>{isEven ? "Even" : "Odd"}</span>
			<button onClick={IncrementTwo}>Counter 2 - {counterTwo}</button>
		</div>
	);
}

export default Memoization;
