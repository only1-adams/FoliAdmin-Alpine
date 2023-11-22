init(() => {
	Alpine.data("mostViewedCategory", () => ({
		data: [
			{ category: "Entertainment", percentage: 45 },
			{ category: "Government", percentage: 22 },
			{ category: "Sports", percentage: 17 },
			{ category: "Health & Fitness", percentage: 10 },
			{ category: "Religion", percentage: 6 },
		],
		width: 0,
		height: 0,

		setWidthHeight(container) {
			const computedWidth = getComputedStyle(container).width;
			const computedHeight = getComputedStyle(container).height;

			const newWidth = Array.from(computedWidth);
			newWidth.splice(-2, 2);
			this.width = newWidth.join("");

			const newHeight = Array.from(computedHeight);
			newHeight.splice(-2, 2);
			this.height = newHeight.join("");
		},

		displayDonutChart(container) {
			const radius = Math.min(this.width, this.height) / 2;
			const svg = d3
				.select(container)
				.append("svg")
				.attr("width", this.width)
				.attr("height", this.height);

			const g = svg
				.append("g")
				.attr(
					"transform",
					"translate(" + this.width / 4 + ", " + this.height / 2 + ")"
				);

			const color = d3.scaleOrdinal([
				"#724CF9",
				"#FFC400",
				"#B1DBFF",
				"#BC2EDF",
				"#ED821F",
			]);

			const pie = d3
				.pie()
				.sort(null)
				.value((d) => {
					return d.percentage;
				});

			const path = d3
				.arc()
				.innerRadius(60)
				.outerRadius(radius - 40);

			const arcs = g
				.selectAll(".arc")
				.data(pie(this.data))
				.enter()
				.append("g")
				.attr("class", "arc")
				.style("cursor", "pointer");

			arcs
				.append("path")
				.attr("d", path)
				.attr("fill", (d) => {
					return color(d.data.category);
				});

			const legends = svg
				.append("g")
				.attr(
					"transform",
					"translate(" + (this.width - 170) + ", " + this.height / 8 + ")"
				)
				.selectAll(".legends")
				.data(pie(this.data));

			const legend = legends
				.enter()
				.append("g")
				.classed("legends", true)
				.attr("transform", (d, i) => {
					return "translate(0," + (i + 1) * 30 + ")";
				});

			legend
				.append("circle")
				.attr("width", 10)
				.attr("height", 10)
				.attr("r", 7)
				.style("fill", (d) => {
					return color(d.data.category);
				});

			legend
				.append("text")
				.text((d) => {
					return d.data.percentage + "%";
				})
				.attr("fill", "#92faf4")
				.attr("x", 20)
				.attr("y", 5)
				.style("font-size", "1.2rem")
				.style("font-weight", "600");

			legend
				.append("text")
				.text((d) => {
					return d.data.category;
				})
				.attr("fill", "white")
				.attr("x", 50)
				.attr("y", 5)
				.style("font-size", "1.2rem")
				.style("font-weight", "400");
		},
	}));
});
