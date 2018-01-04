import Vue from "vue";
import moment from "moment";

Vue.filter("date", (input, format) => {
    return moment(input).format(format);
});
