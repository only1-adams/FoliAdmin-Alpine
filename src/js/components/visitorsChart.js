init(() => {
	Alpine.data("dailyVisitorsChart", () => ({
		sevenDays: [
			{ day: 1, visits: 30 },
			{ day: 2, visits: 23 },
			{ day: 3, visits: 35 },
			{ day: 4, visits: 37 },
			{ day: 5, visits: 19 },
			{ day: 6, visits: 40 },
			{ day: 7, visits: 35 },
		],
		fourteenDays: [
			{ day: 1, visits: 30 },
			{ day: 2, visits: 23 },
			{ day: 3, visits: 25 },
			{ day: 4, visits: 17 },
			{ day: 5, visits: 29 },
			{ day: 6, visits: 14 },
			{ day: 7, visits: 35 },
			{ day: 8, visits: 20 },
			{ day: 9, visits: 23 },
			{ day: 10, visits: 15 },
			{ day: 11, visits: 9 },
			{ day: 12, visits: 5 },
			{ day: 13, visits: 24 },
			{ day: 14, visits: 10 },
		],

		daysToView: 14,
		chartData: [],

		margin: {
			top: 20,
			bottom: 20,
			left: 20,
			right: 20,
		},

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

		displayChart(container, tooltip) {
			container.innerHTML = "";
			const svg = d3
				.select(container)
				.append("svg")
				.attr("width", this.width)
				.attr("height", this.height)
				.attr("viewbox", [0, 0, this.width, this.height]);

			const xScale = d3
				.scaleBand()
				.domain(d3.range(this.chartData.length))
				.range([this.margin.left * 2 + 10, this.width - this.margin.right])
				.padding(0.1);

			const yScale = d3
				.scaleLinear()
				.domain([
					0,
					d3.max(this.chartData, (d) => {
						return d.visits;
					}) + 5,
				])
				.range([this.height - this.margin.bottom * 2, this.margin.top]);

			const xAxis = (g) => {
				g.attr(
					"transform",
					`translate(0,${this.height - this.margin.bottom * 2})`
				).call(d3.axisBottom(xScale).tickFormat((i) => this.chartData[i].day));
			};

			const yAxis = (g) => {
				g.attr("transform", `translate(${this.margin.left * 2 + 10},0)`).call(
					d3
						.axisLeft(yScale)
						.ticks(4)
						.tickFormat((d, i) => {
							if (d > 0) {
								return d + "k";
							} else {
								return d;
							}
						})
				);
			};

			function mouseOver(d, i) {
				const barWidth = d3.select(this).attr("width");
				const xPosition =
					parseFloat(d3.select(this).attr("x")) + (barWidth - 80) / 2;
				const yPosition = parseFloat(d3.select(this).attr("y")) + 12;

				console.log(d);

				d3.select(tooltip)
					.style("left", xPosition + "px")
					.style("top", yPosition + "px")
					.text("day " + d.day + ": " + d.visits + "k");
				d3.select(tooltip).classed("active", true);
			}

			function mouseOut() {
				d3.select(tooltip).classed("active", false);
			}

			svg
				.append("g")
				.attr("fill", "#EAEAEA")
				.selectAll("rect")
				.data(this.chartData)
				.enter()
				.append("rect")
				.classed(
					"cursor-pointer transition duration-200 hover:fill-accent",
					true
				)
				.on("mouseover", mouseOver)
				.on("mouseout", mouseOut)
				.attr("x", (d, i) => xScale(i))
				.attr("y", 80)
				.attr("width", xScale.bandwidth())
				.attr("height", 0)
				.transition()
				.attr("height", (d) => {
					return yScale(0) - yScale(d.visits);
				})
				.attr("y", (d) => yScale(d.visits))
				.ease(d3.easeElastic)
				.duration(3000)
				.delay((d, i) => {
					return i * 50;
				})
				.attr("rx", 5)
				.attr("ry", 5);

			svg
				.append("g")
				.classed("font-custom", true)
				.classed("font-bold text-xl", true)
				.call(xAxis);
			svg
				.append("g")
				.classed("font-custom", true)
				.classed("font-bold text-xl", true)
				.call(yAxis);
			svg.node();
		},
	}));
});
