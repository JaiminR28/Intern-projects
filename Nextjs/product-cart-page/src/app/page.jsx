"use client";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
	fetchAllProductsAsync,
	selectAllProducts,
} from "@/redux/product/productSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
	const dispatch = useAppDispatch();

	const products = useAppSelector(selectAllProducts);

	useEffect(() => {
		dispatch(fetchAllProductsAsync());
	}, [dispatch]);

	return (
		<main className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					34 Products Found
				</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{products.map((product) => (
						<div key={product.id} className="group relative">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<Image
									src={
										product.thumbnail.includes("https://")
											? product.thumbnail
											: "/noavatar.png"
									}
									alt={product.description}
									className="h-full w-full object-cover aspect-square object-center lg:h-full lg:w-full"
									width={100}
									height={200}
									sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<Link href="">
											<p>
												<span
													aria-hidden="true"
													className="absolute inset-0"
												/>
												{product.title}
											</p>
										</Link>
									</h3>
								</div>
								<p className="text-sm font-medium text-gray-900">
									{product.price}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</main>
	);
}
