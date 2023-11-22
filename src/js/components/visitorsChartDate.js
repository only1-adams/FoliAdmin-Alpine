init(() => {
	Alpine.data("visitorsChartDate", () => ({
		open: false,
		display: "Last 7 days",
		dateOptions: ["Last 7 days", "Last 14 days", "This month", "Last Month"],
		dateRange: "",
		toggle() {
			this.open = !this.open;
		},
		instatiateCalendar(input, container, openBtn) {
			const fp = flatpickr(input, {
				disableMobile: true,
				mode: "range",
				appendTo: container,
				dateFormat: "Y-m-d",
				altInput: true,
				altFormat: "F j, Y h:i K",
				clickOpens: false,
				plugins: [new confirmDatePlugin({})],
				onChange: (_, dateStr) => {
					this.dateRange = dateStr.split("to");
				},
			});

			openBtn.onclick = () => {
				fp.open();
			};
		},

		convertToNumbers(arr) {
			arr.forEach((arrObj, i, array) => {
				array[i] = Number(arrObj);
			});
			return arr;
		},

		validateDates(startDate, endDate) {
			try {
				const dateOne = new Date(
					startDate[0], //year
					startDate[1] - 1, //month: -1 because months in date objects are zero based i.e 0-11 === Jan-Dec
					startDate[2] // date
				);

				const dateTwo = new Date(
					endDate[0], //year
					endDate[1] - 1, //month: -1 because months in date objects are zero based i.e 0-11 === Jan-Dec
					endDate[2] // date
				);

				const startingDate = new Date(dateOne);
				const endingDate = new Date(dateTwo);

				const diffInMilliSeconds =
					endingDate.getTime() - startingDate.getTime();
				const days = Math.floor(diffInMilliSeconds / (1000 * 60 * 60 * 24));

				if (days < 7) {
					throw new Error("7 days min");
				}

				if (days > 31) {
					throw new Error("31 days max");
				}

				this.display = "custom";
			} catch (error) {
				alert(error);
			}
		},
	}));
});
