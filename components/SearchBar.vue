<template>
  <div class="search-bar">
    <div class="range-input">
      <img class="icon" src="~/static/icon/icon_calender.svg" />
      <input
        type="text"
        class="range-input-field"
        v-model="dateRange.start"
        @change="validDate(dateRange.start, true)"
      />
      <span class="dash">-</span>
      <input
        type="text"
        class="range-input-field"
        v-model="dateRange.end"
        @change="validDate(dateRange.start, false)"
      />
    </div>
    <div class="search-button">
      <img class="icon" src="~/static/icon/icon_search.svg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateRange: {
        start: "2020/1/1",
        end: "2020/1/1",
      },
      dateValid: {
        start: true,
        end: true,
      },
    };
  },
  methods: {
    validDate: function (date, isStart) {
      var re = new RegExp(
        "^(((0?[1-9]|1[012])/(0?[1-9]|1d|2[0-8])|(0?[13456789]|1[012])/(29|30)|(0?[13578]|1[02])/31)/(19|[2-9]d)d{2}|0?2/29/((19|[2-9]d)(0[48]|[2468][048]|[13579][26])|(([2468][048]|[3579][26])00)))$"
      );

      if (isStart) this.dateValid.start = re.test(date);
      else this.dateValid.end = re.test(date);
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
      max-width: 85px;
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