import type { AppProps } from 'next/app'

/* This is supposed to stay outside because if we let it inside app, all the pages that we enter will cause a re render 
on that styling, because everything inside the app will be rendered again on each page change */

export default function App({
	Component,
	pageProps,
}: AppProps) {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	)
}
