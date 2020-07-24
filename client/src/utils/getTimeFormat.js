export const timeConversionFrontend = (seconds) => {
	const minutes = (seconds / 60).toFixed(1);
	const hours = (seconds / (60 * 60)).toFixed(2);

	if (seconds < 60) {
		return seconds + ' Sec';
	} else if (minutes < 60) {
		return minutes + ' Min';
	} else {
		return hours + ' Hrs';
	}
};

export const timeConversionBackend = (millisec) => {
	const seconds = (millisec / 1000).toFixed(0);
	const minutes = (millisec / (1000 * 60)).toFixed(1);
	const hours = (millisec / (1000 * 60 * 60)).toFixed(2);
	const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

	if (seconds < 60) {
		return seconds + ' Sec';
	} else if (minutes < 60) {
		return minutes + ' Min';
	} else if (hours < 24) {
		return hours + ' Hrs';
	} else {
		return days + ' Days';
	}
};
