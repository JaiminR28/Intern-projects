"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	MinusIcon,
	PlusIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";

import {
	fetchAllProductsAsync,
	fetchBrandsAsync,
	fetchCategoriesAsync,
	selectAllProducts,
	selectBrands,
	selectCategories,
	selectTotalItems,
} from "@/redux/product/productSlice";
import { discountedPrice } from "@/lib/constants";

const sortOptions = [
	{ name: "Best Rating", sort: "rating", order: "desc", current: false },
	{
		name: "Price: Low to High",
		sort: "price",
		order: "asc",
		current: false,
	},
	{
		name: "Price: High to Low",
		sort: "price",
		order: "desc",
		current: false,
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Home() {
	const dispatch = useAppDispatch();

	const products = useAppSelector(selectAllProducts);
	const totalItems = useAppSelector(selectTotalItems);
	const categories = useAppSelector(selectCategories);
	const brands = useAppSelector(selectBrands);

	const filters = [
		{
			id: "category",
			name: "Category",
			options: categories,
		},
		{
			id: "brand",
			name: "Brand",
			options: brands,
		},
	];

	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
	const [filter, setFilter] = useState({});
	const [sort, setSort] = useState({});
	const [page, setPage] = useState(1);

	const handleFilter = (e, section, option) => {
		// filter = {"category": ["smartphone", "laptop"]}
		// sort = {_sort: "price", _order="desc"}
		// pagination = {_page: 1, _limit=10}
		//  TODO: SUPORT FOR MULTIPLE FILTERS TO BE IMPLEMENTED

		const newFilter = { ...filter };
		if (e.target.checked) {
			if (newFilter[section.id]) {
				newFilter[section.id].push(option.value);
			} else {
				newFilter[section.id] = [option.value];
			}
		} else {
			const index = newFilter[section.id].findIndex(
				(el) => el === option.value
			);
			newFilter[section.id].splice(index, 1);
		}
		setFilter(newFilter);
	};

	const handleSort = (e, option) => {
		const sort = {
			_sort: option.sort,
			_order: option.order,
		};
		setSort(sort);
	};

	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchBrandsAsync());
		dispatch(fetchCategoriesAsync());
	}, []);

	return (
		<div className="bg-white">
			<div>
				<main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-12">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900">
							New Arrivals
						</h1>

						<div className="flex items-center">
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<div>
									<Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										Sort
										<ChevronDownIcon
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
										/>
									</Menu.Button>
								</div>

								<Transition
									as={Fragment}
									enter="transition ease-out duration-100"
									enterFrom="transform opacity-0 scale-95"
									enterTo="transform opacity-100 scale-100"
									leave="transition ease-in duration-75"
									leaveFrom="transform opacity-100 scale-100"
									leaveTo="transform opacity-0 scale-95"
								>
									<Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										<div className="py-1">
											{sortOptions.map((option) => (
												<Menu.Item key={option.name}>
													{({ active }) => (
														<p
															onClick={(e) => {
																handleSort(
																	e,
																	option
																);
															}}
															className={classNames(
																option.current
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																active
																	? "bg-gray-100"
																	: "",
																"block px-4 py-2 text-sm"
															)}
														>
															{option.name}
														</p>
													)}
												</Menu.Item>
											))}
										</div>
									</Menu.Items>
								</Transition>
							</Menu>

							<button
								type="button"
								className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
							>
								<span className="sr-only">View grid</span>
								<Squares2X2Icon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<section
						aria-labelledby="products-heading"
						className="pb-24 pt-6"
					>
						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
							{/* Filters */}
							<DesktopFilter
								handleFilter={handleFilter}
								filters={filters}
							/>

							{/* Product grid */}
							<div className="lg:col-span-3">
								<ProductGrid products={products} />
							</div>
						</div>
					</section>
					{/* Section on product and filters */}
				</main>
			</div>
		</div>
	);
}

function DesktopFilter({ handleFilter, filters }) {
	return (
		<Fragment>
			<form className="hidden lg:block">
				{filters.map((section) => (
					<Disclosure
						as="div"
						key={section.id}
						className="border-b border-gray-200 py-6"
					>
						{({ open }) => (
							<>
								<h3 className="-my-3 flow-root">
									<Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
										<span className="font-medium text-gray-900">
											{section.name}
										</span>
										<span className="ml-6 flex items-center">
											{open ? (
												<MinusIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											) : (
												<PlusIcon
													className="h-5 w-5"
													aria-hidden="true"
												/>
											)}
										</span>
									</Disclosure.Button>
								</h3>
								<Disclosure.Panel className="pt-6">
									<div className="space-y-4">
										{section.options.map(
											(option, optionIdx) => (
												<div
													key={option.value}
													className="flex items-center"
												>
													<input
														id={`filter-${section.id}-${optionIdx}`}
														name={`${section.id}[]`}
														defaultValue={
															option.value
														}
														type="checkbox"
														defaultChecked={
															option.checked
														}
														onChange={(e) =>
															handleFilter(
																e,
																section,
																option
															)
														}
														className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
													/>
													<label
														htmlFor={`filter-${section.id}-${optionIdx}`}
														className="ml-3 text-sm text-gray-600"
													>
														{option.label}
													</label>
												</div>
											)
										)}
									</div>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				))}
			</form>
		</Fragment>
	);
}

function ProductGrid({ products }) {
	return (
		<div>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-4 py-10 sm:px-6  lg:max-w-7xl lg:px-8">
					<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
						{products.map((product) => (
							<div key={product.id} className="group relative">
								<div className="min-h-60 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
									<Image
										src={
											product.thumbnail.includes("https")
												? product.thumbnail
												: "/noavatar.png"
										}
										alt={product.title}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
										width={100}
										height={300}
									/>
								</div>
								<div className="mt-4 flex justify-between">
									<div className="max-w-xs">
										<h3 className="text-md text-gray-700">
											<Link
												href={`/product-detail/${product.id}`}
											>
												<span
													aria-hidden="true"
													className="absolute inset-0"
												/>
												{product.title}
											</Link>
										</h3>
										<p className="flex mt-3 text-sm text-gray-500">
											{[0, 1, 2, 3, 4].map((rating) => (
												<StarIcon
													key={rating}
													className={classNames(
														product.rating > rating
															? "text-gray-900"
															: "text-gray-200",
														"h-5 w-5 flex-shrink-0"
													)}
													aria-hidden="true"
												/>
											))}
											<span className="align-bottom">
												{product.rating}
											</span>
										</p>
									</div>
									<div>
										<p className="block text-sm font-medium text-gray-900 min-w-fit">
											$ {discountedPrice(product)}
										</p>
										<p className="block text-sm line-through font-medium text-gray-400 min-w-fit">
											${product.price}
										</p>
										{product.deleted && (
											<div>
												<p className="text-sm font-medium text-red-500">
													{" "}
													product Deleted
												</p>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
