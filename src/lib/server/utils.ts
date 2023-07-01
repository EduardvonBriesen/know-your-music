// https://sumn2u.medium.com/string-similarity-comparision-in-js-with-examples-4bae35f13968
export const LevenshteinDistance = (a: string, b: string) => {
	if (a.length == 0) return b.length;
	if (b.length == 0) return a.length;

	const matrix = [];

	// increment along the first column of each row
	let i;
	for (i = 0; i <= b.length; i++) {
		matrix[i] = [i];
	}

	// increment each column in the first row
	let j;
	for (j = 0; j <= a.length; j++) {
		matrix[0][j] = j;
	}

	// Fill in the rest of the matrix
	for (i = 1; i <= b.length; i++) {
		for (j = 1; j <= a.length; j++) {
			if (b.charAt(i - 1) == a.charAt(j - 1)) {
				matrix[i][j] = matrix[i - 1][j - 1];
			} else {
				matrix[i][j] = Math.min(
					matrix[i - 1][j - 1] + 1, // substitution
					Math.min(
						matrix[i][j - 1] + 1, // insertion
						matrix[i - 1][j] + 1
					)
				); // deletion
			}
		}
	}

	return matrix[b.length][a.length];
};

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
