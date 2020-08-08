<template>
  <tr class="mail-table-row" @mouseover="currKey = mailData.key" @mouseleave="currKey = null">
    <td class="mail-table-from">{{ mailData.from }}</td>
    <td class="mail-table-to">{{ `${mailData.to[0]}${(mailData.to[1]) ? ", ...": ""}` }}</td>
    <td class="mail-table-addto">
      <span
        class="mail-table-number"
        :style="{ backgroundColor: (currKey === mailData.key) ? 'rgb(2, 52, 222)' : '' }"
        v-if="mailData.to.length > 1"
      >{{ `+${mailData.to.length - 1}` }}</span>
    </td>
    <td class="mail-table-subject">
      <div class="subject">{{ mailData.subject }}</div>
      <div class="content">{{ mailData.content }}</div>
    </td>
    <td class="mail-table-attach">
      <img
        class="clip"
        src="~/static/icon/icon_clip.svg"
        v-if="mailData.attach.length"
        :class="{ 'filtered': currKey === mailData.key }"
      />
    </td>
    <td class="mail-table-date">{{ calcDate(mailData.date) }}</td>
  </tr>
</template>

<script>
export default {
  props: ["mailData"],
  data() {
    return {
      currKey: null,
    };
  },
  methods: {
    calcDate: function (date) {
      // Assume that the current date is Dec 1, 2020
      const currDate = new Date(2020, 11, 1);

      const y = date.getYear(),
        m = date.getMonth(),
        d = date.getDate();

      if (currDate.getYear() === y) {
        if (currDate.getMonth() === m && currDate.getDate() === d)
          return `${date.getHours()}:${date.getMinutes()}`;
        else
          return `${date.toLocaleString("default", { month: "short" })} ${
            d < 10 ? "0" + d : d
          }`;
      } else return `${y + 1900}/${m + 1}/${d}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.mail-table-row {
  color: rgb(59, 51, 55);

  &:hover {
    color: rgb(2, 52, 222) !important;
    cursor: pointer;
  }

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: inherit;

    border-bottom: 1px rgb(225, 225, 225) solid;
  }

  .mail-table-attach {
    .clip {
      width: 20px;
      height: 20px;

      &.filtered {
        filter: invert(14%) sepia(87%) saturate(5840%) hue-rotate(231deg)
          brightness(84%) contrast(109%);
      }
    }
  }

  .mail-table-addto {
    .mail-table-number {
      padding: 0px 5px;
      background-color: rgb(136, 136, 136);
      font-size: 16px;
      line-height: 18px;
      vertical-align: middle;
      color: white;

      border-radius: 5px;
    }
  }

  .mail-table-subject {
    .content {
			margin-top: 4px;
      font-size: 14px;
      font-weight: 400;

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .mail-table-from,
  .mail-table-to,
  .mail-table-subject,
  .mail-table-date {
    padding: 14px 16px;
    line-height: 18px;
    vertical-align: middle;
  }
}
</style>>