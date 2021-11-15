import '../styles/globals.css'
import React from 'react';

function MyApp({ Component, pageProps }) {
  // When render on client remove server-side injected css
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles);
		}
	}, []);

	return (
		<Component {...pageProps} />
	);
}

export default MyApp
