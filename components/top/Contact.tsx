import { siteConfig } from '@/site.config';
import { ContactProps } from '@/types/types';
import React, { FC, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

interface FetchRequest {
	url: string;
	options: object;
}

async function fetchAsync(request: FetchRequest) {
	return await fetch(request.url, request.options);
}

const Contact: FC<ContactProps> = ({ item }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	const submitForm = async (e: any) => {
		e.preventDefault();
		const res = await fetchAsync({
			url: `./api/submit-form`,
			options: {
				method: 'POST',
				body: JSON.stringify({ name, email, message }),
			},
		});
		if (res.status === 201) {
			toast('メッセージが送信されました', { type: 'success' });
		} else {
			toast('メッセージ送信が失敗しました', { type: 'error' });
		}
	};
	return (
		<div
			id="contact"
			ref={item}
			className="bg-contact py-40 pt-24 text-white relative h-full max-h-smart w-full"
		>
			<p className="text-white w-full text-5xl text-center md:mb-10  mb-20 font-['Montserrat',sans-serif] relative">
				<span className="anime-title contact">
					<b>CONTACT</b>
				</span>
			</p>
			<form
				name="contact-form"
				onSubmit={submitForm}
				className="bg-gray-600/50 max-w-6xl w-full mx-auto p-12 h-full"
			>
				<label htmlFor="textContent" className="text-white/70 text-base">
					お名前
				</label>
				<input
					id="name"
					type="text"
					name="name"
					placeholder="お名前"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
					className="w-full p-2 text-base bg-gray-600/80"
				/>
				<label htmlFor="email" className="text-base mt-5 block text-white/70">
					Eメール
				</label>
				<input
					id="email"
					type="email"
					name="email"
					placeholder="Eメール"
					value={email}
					className="w-full p-2 text-base bg-gray-600/80"
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label
					htmlFor="contentText"
					className="mt-5 block text-white/70 text-base"
				>
					お問い合わせ内容
				</label>
				<textarea
					className="w-full p-2 h-40 text-base bg-gray-600/80"
					name="message"
					id="contentText"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					required
				></textarea>
				<input
					type="submit"
					value="メッセージを送信する"
					className="text-center bg-gradient-to-r from-amber-500 to-yellow-500 mt-5 mx-auto block max-w-xs font-bold p-3 text-base w-full hover:from-green-400 hover:to-blue-500"
				/>
			</form>
		</div>
	);
};

export default Contact;
