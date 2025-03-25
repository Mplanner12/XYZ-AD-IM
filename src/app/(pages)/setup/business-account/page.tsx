import React from 'react';
import CompanyForm from './_components/companyForm';

export default function BusinessAccount() {
	return (
		<section className="w-full text-foundation-black-black-400 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] flex-wrap mb-4 bg-foundation-grey-grey-50 rounded-2xl px-4 py-4 ">
			<CompanyForm />
		</section>
	);
}
