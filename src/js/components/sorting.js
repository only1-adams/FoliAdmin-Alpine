init(() => {
	Alpine.data("sorting", () => ({
		open: false,
		toggle() {
			this.open = !this.open;
		},
		sortedby: "default",
		order: "default",
	}));
});
