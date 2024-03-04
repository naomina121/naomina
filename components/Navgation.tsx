import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

const Navgation = () => {
	let router = useRouter();
	let currentPath = router.pathname == '/study';
	let currentPath2 = router.pathname == '/work';

	return (
		<nav className="flex xl:hidden items-center max-w-xl w-full">
			<ul className="flex list-none w-full items-center text-lg font-['Montserrat',sans-serif] font-medium justify-between">
				<li data-ref="about" className="p-2 header-menu-hover">
					<Link className="text-white" href="/#about">
						ABOUT
					</Link>
				</li>
				<li data-ref="skils" className="p-2 header-menu-hover">
					<Link className="text-white" href="/#skils">
						SKILS
					</Link>
				</li>
				<li
					className={
						currentPath
							? 'p-2 header-menu-hover current'
							: 'p-2 header-menu-hover'
					}
				>
					<Link href="/study" className="text-white">
						STUDY
					</Link>
				</li>
				{/* <li
					className={
						currentPath2
							? 'p-2 header-menu-hover current'
							: 'p-2 header-menu-hover'
					}
				>
					<Link className="text-white" href="/work">
						WORK
					</Link>
				</li> */}
				<li data-ref="contact" className="p-2 header-menu-hover">
					<Link className="text-white" href="/#contact">
						CONTACT
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Navgation;
