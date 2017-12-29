const validate_status = require("./validate_status");
const assert = require("assert");

describe("validate_status", () => {
	it("resolves when can transition", () =>
		validate_status("unreviewed", "interesting").then(results =>
			assert(results, true)
		));
	it("rejects when cannot transition", () =>
		validate_status("boring", "sent").catch(e =>
			assert(e, `You cannot transition from boring to sent`)
		));
	it("throws an error when given unknown old_status", () =>
		validate_status(undefined, "sent").catch(e =>
			assert(e.message, "Unknown old_status: undefined")
		));
	it("throws an error when given unknown new_status", () =>
		validate_status("sent", null).catch(e =>
			assert(e.message, "Unknown new_status: undefined")
		));
});
