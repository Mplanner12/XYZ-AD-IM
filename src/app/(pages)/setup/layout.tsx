import LoadingOverlay from '@/components/reusable/LoadingOverlay';
import React, { Suspense } from 'react';
import SetupHeader from './_setupComponets/setupHeader';
import Sidebar from './_setupComponets/Sidebar';
;

export default function SetupLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="w-full bg-white flex justify-between leading-normal ">
			<div className="sticky top-0 h-screen z-[500]">
				<Sidebar />
			</div>
			<main className="w-full flex flex-col items-start justify-start gap-[16px] relative">
				<div className="z-[400] w-full">
					<SetupHeader />
				</div>
				<div className="w-full md:px-8 px-4">
					<Suspense fallback={<LoadingOverlay/>}>
          {children}
        </Suspense>
				</div>
			</main>
		</div>
	);
}
