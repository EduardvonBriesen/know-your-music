// https://en.wikipedia.org/wiki/Kendall_rank_correlation_coefficient
export const kendallRankCorrelation = (arr1: number[], arr2: number[]): number => {
	// Check if the arrays have the same length
	if (arr1.length !== arr2.length) {
		throw new Error('Arrays must have the same length');
	}

	const n = arr1.length;
	let concordantPairs = 0;
	let discordantPairs = 0;

	for (let i = 0; i < n - 1; i++) {
		for (let j = i + 1; j < n; j++) {
			const a = arr1[i] - arr1[j];
			const b = arr2[i] - arr2[j];

			if (a * b > 0) {
				concordantPairs++;
			} else if (a * b < 0) {
				discordantPairs++;
			}
		}
	}

	const tau = (concordantPairs - discordantPairs) / ((n * (n - 1)) / 2);

	return tau;
};
