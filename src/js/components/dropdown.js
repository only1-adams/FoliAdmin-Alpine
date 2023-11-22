init(() => {
	Alpine.data("dropdown", () => ({
		open: false,

		get isOpen() {
			return this.open;
		},

		toggle() {
			this.open = !this.open;
		},
	}));
});
