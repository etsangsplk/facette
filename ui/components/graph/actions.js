import {dateFormatFilename, dateFormatRFC3339} from ".";
import html2canvas from "html2canvas";
import moment from "moment";
import pickBy from "lodash/pickBy";
import slugify from "slugify";

export default {
    applyRange(options) {
        this.applyRange(options);
    },

    export(e, type) {
        let linkEl = document.createElement("a");

        let baseName =  `${slugify(this.chart.config.titles.main.text || "unnamed")}_${moment(this.data.start)
            .format(dateFormatFilename)}_${moment(this.data.end).format(dateFormatFilename)}`;

        switch (type) {
        case "png": {
            html2canvas(this.chart.canvas.parentNode, {
                logging: false,
            }).then((canvas) => {
                let png = canvas.toDataURL("image/png");

                Object.assign(linkEl, {
                    download: `${baseName}.png`,
                    href: png.replace("image/png", "image/octet-stream"),
                });

                document.body.appendChild(linkEl);
                linkEl.click();
                document.body.removeChild(linkEl);

                URL.revokeObjectURL(png);
            });

            break;
        }

        case "summary_csv":
        case "summary_json": {
            let data;

            if (type == "summary_csv") {
                let summary = "";

                this.data.series.forEach((series, idx) => {
                    let keys = Object.keys(series.summary);

                    if (idx === 0) {
                        summary += `name,${keys.join(",")}\n`;
                    }

                    summary += `"${series.name}",${keys.map(a => series.summary[a]).join(",")}\n`;
                });

                data = "data:text/csv;charset=utf-8," + encodeURIComponent(summary);
            } else {
                let summary = {};

                this.data.series.map(a => summary[a.name] = a.summary);

                data = "data:application/json;charset=utf-8," +
                    encodeURIComponent(JSON.stringify(summary, null, "\t"));
            }

            Object.assign(linkEl, {
                download: `${baseName}_${type.replace("_", ".")}`,
                href: data,
            });

            document.body.appendChild(linkEl);
            linkEl.click();
            document.body.removeChild(linkEl);

            break;
        }

        default:
            console.warn(`Unknown "${type}" export type`);
        }
    },

    move(forward = false) {
        let start = moment(this.data.start),
            end = moment(this.data.end),
            delta = end.diff(start) * 0.25;

        if (forward) {
            this.applyRange({
                start_time: start.add(delta).format(dateFormatRFC3339),
                end_time: end.add(delta).format(dateFormatRFC3339),
            });
        } else {
            this.applyRange({
                start_time: start.add(-delta).format(dateFormatRFC3339),
                end_time: end.add(-delta).format(dateFormatRFC3339),
            });
        }
    },

    propagate() {
        this.$eventbus.$emit("graph-action", "applyRange", pickRange(this.options));
    },

    setRange(range = null) {
        switch (range) {
        case null:
            this.applyRange(pickRange(this.originalOptions));
            break;

        case "custom":
            // TODO: handle custom prompt
            break;

        default:
            this.applyRange({range: range});
        }
    },

    toggleLegend(state) {
        this.showLegend = state;

        if (state) {
            this.$nextTick(() => this.$refs.legend.update(this.data, this.chart));
        }
    },

    update() {
        this.update();
    },

    zoom(zoomIn = false) {
        let start = moment(this.data.start),
            end = moment(this.data.end),
            delta = end.diff(start);

        if (zoomIn) {
            delta *= 0.25;

            this.applyRange({
                start_time: start.add(delta).format(dateFormatRFC3339),
                end_time: end.add(-delta).format(dateFormatRFC3339),
            });
        } else {
            delta *= 0.5;

            this.applyRange({
                start_time: start.add(-delta).format(dateFormatRFC3339),
                end_time: end.add(delta).format(dateFormatRFC3339),
            });
        }
    },
};

function pickRange(options) {
    return pickBy(options, (value, key) => ["time", "range", "start_time", "end_time"].indexOf(key) != -1);
}
