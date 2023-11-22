init(() => {
	Alpine.store("usersOffcanvas", {
		open: false,
		get isOpen() {
			return this.open;
		},
	});

	Alpine.store("postsOffcanvas", {
		open: false,
		get isOpen() {
			return this.open;
		},
	});

	Alpine.store("pollsOffcanvas", {
		open: false,
		showUsers: false,
		get isOpen() {
			return this.open;
		},
	});

	Alpine.store("predictsOffcanvas", {
		open: false,
		showUsers: false,
		get isOpen() {
			return this.open;
		},
	});
});
