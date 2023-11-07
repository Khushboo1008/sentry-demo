import React, {useState} from 'react';
import * as Sentry from '@sentry/nextjs';

const MintPageComp = () => {
	const [isWalletConnected, setIsWalletConnected] = useState(false);
	return (
		<div>
			<button
				onClick={async () => {
					const transaction = Sentry.startTransaction({
						name: 'Example Frontend Transaction',
					});

					Sentry.configureScope(scope => {
						scope.setSpan(transaction);
					});

					try {
						const res = await fetch('/api/sentry-example-api');
						if (!res.ok) {
							throw new Error('Sentry Example Frontend Error');
						}
					} finally {
						transaction.finish();
					}
				}}
			>
				Mint
			</button>
		</div>
	);
};

export default MintPageComp;
