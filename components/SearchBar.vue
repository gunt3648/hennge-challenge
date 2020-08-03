<template>
  <div class="search-bar">
    <div class="range-input">
      <img class="icon" src="~/static/icon/icon_calender.svg" />
      <input type="text" class="range-input-field" v-model="date.start" />
      <span class="dash">-</span>
      <input type="text" class="range-input-field" v-model="date.end" />
    </div>
    <div class="search-button" @click="search(date)">
      <img class="icon" src="~/static/icon/icon_search.svg" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      date: {
        start: "2020/1/1",
        end: "2020/12/31",
      },
    };
  },
  methods: {
    search: async function (date) {
			const stTemp = date.start.split("/");
			const enTemp = date.end.split("/");
			
      if (this.validDate(date)) {
        await this.$store.dispatch(
          "mail/setDate",
          {
						start: new Date(stTemp[0], stTemp[1], stTemp[2]),
						end: new Date(enTemp[0], enTemp[1], enTemp[2])
					}
        );
        await this.$store.dispatch("mail/fetch");
        await this.$store.dispatch("mail/sort", false);
      } else console.error("Invalid date");
    },
    validDate: function (date) {
      let re = new RegExp(
        "^(?:20)[0-9]{2}[/]{1}(0?[1-9]|1[0-2])[/]([12][0-9]|3[01]|[1-9])$"
      );

      const stTemp = date.start.split("/");
      const enTemp = date.end.split("/");

      let stDate = new Date(stTemp[0], stTemp[1], stTemp[2]);
      let enDate = new Date(enTemp[0], enTemp[1], enTemp[2]);

      return re.test(date.start) && re.test(date.end) && enDate >= stDate;
    },
  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  width: 100%;

  .range-input {
    .range-input-field {
      border: none;
      outline: 0;
      min-width: 85px;
      max-width: 110px;
    }

    .range-input-field,
    .dash {
      font-size: 20px;
      font-weight: 600;
    }

    display: inline-block;

    height: 100%;
    padding: 8px 22px;
    padding-right: 42px;

    border: 2px solid rgb(222, 222, 222);
    border-radius: 8px 0 0 8px;
  }

  .search-button {
    display: inline-block;

    height: 100%;
    padding: 11px 15px;
    margin-left: -8px;

    border: 2px solid rgb(222, 222, 222);
    border-radius: 0 8px 8px 0;

    background: rgb(245, 245, 245);

    &:hover {
      cursor: pointer;
    }
  }

  .icon {
    width: 25px;
    height: 25px;
    margin-right: 5px;
  }

  .range-input-field,
  .dash,
  .icon {
    line-height: 30px;
    vertical-align: middle;
  }
}
</style>>