class ProgressBar {
	constructor() {
		this.total = 0;
		this.current = 0;
	}
	init(total) {
		this.total = total;
		this.current = 0;
		const current_progress = this.current / this.total * 100;
		this.update(current_progress);
	}
	get_current_progress() {
		return this.current / this.total * 100;
	}
	draw(current, total, current_progress) {
		process.stdout.clearLine();
		process.stdout.cursorTo(0);
		process.stdout.write(
			`Current progress: ${current}/${total}  | ${current_progress.toFixed(
				2
			)}%`
		);
	}
	update(current) {
		this.current = current;
		const current_progress = this.get_current_progress();
		if (current_progress < 100) {
			this.draw(current, this.total, current_progress);
		} else {
			this.stop();
		}
	}
	stop() {
		this.draw(this.total, this.total, 100);
		process.stdout.write(`\nFinished!\n`);
	}
}

module.exports = ProgressBar = new ProgressBar();
