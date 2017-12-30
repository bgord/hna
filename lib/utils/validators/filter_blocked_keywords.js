const filter_blocked_keywords = ({ blocked_keywords }) => ({ title }) => {
	const words = title.split(" ");
	const words_count = words.length;

	const filtered_words = words.filter(
		word => !blocked_keywords.includes(word.toLowerCase())
	);
	const filtered_words_count = filtered_words.length;

	return words_count === filtered_words_count;
};

module.exports = filter_blocked_keywords;
