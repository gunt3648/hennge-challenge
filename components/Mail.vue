<template>
  <tr class="mail-table-row" @mouseover="currKey = mailData.key" @mouseleave="currKey = null">
    <td class="mail-table-from hide-mobile">{{ mailData.from }}</td>
    <td class="mail-table-to hide-mobile">{{ `${mailData.to[0]}${(mailData.to[1]) ? ", ...": ""}` }}</td>
    <td class="mail-table-addto hide-mobile">
      <span
        class="mail-table-number"
        :style="{ backgroundColor: (currKey === mailData.key) ? 'rgb(2, 52, 222)' : '' }"
        v-if="mailData.to.length > 1"
      >{{ `+${mailData.to.length - 1}` }}</span>
    </td>
    <td class="mail-table-subject hide-mobile">
      <div class="subject">{{ mailData.subject }}</div>
      <div class="content">{{ mailData.content }}</div>
    </td>
    <td class="mail-table-attach hide-mobile">
      <img
        class="clip"
        src="~/static/icon/icon_clip.svg"
        v-if="mailData.attach.length"
        :class="{ 'filtered': currKey === mailData.key }"
      />
    </td>
    <td class="mail-table-date hide-mobile">{{ calcDate(mailData.date) }}</td>
    <td class="mail-table-mobile hide-desktop">
      <div class="mail-mobile-head">
        <span class="mail-mobile-icon">
          <img class="mail" src="~/static/icon/icon_mail_sp.svg" />
        </span>
        <span class="mail-mobile-detail">
          <p class="mail-mobile-from">{{ mailData.from }}</p>
          <p
            class="mail-mobile-to"
          >{{ `${mailData.to[0]}${(mailData.to[1]) ? ", "+ mailData.to[1] : "" }${(mailData.to[2]) ? ", ...": ""}` }}</p>
        </span>
        <div class="mail-mobile-date">
          <img
            class="clip"
            src="~/static/icon/icon_clip.svg"
            v-if="mailData.attach.length"
            :class="{ 'filtered': currKey === mailData.key }"
          />
          {{ calcDate(mailData.date) }}
          <img
            class="arrow"
            src="~/static/icon/icon_arrow02.svg"
          />
        </div>
        <div
          class="mail-mobile-number"
          v-if="mailData.to.length > 2"
        >{{ `+${mailData.to.length - 2}` }}</div>
      </div>
      <div class="mail-mobile-subject">{{ mailData.subject }}</div>
      <div class="mail-mobile-content">{{ mailData.content }}</div>
    </td>
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

@media only screen and (max-width: 768px) {
  .mail-table-row {
    &:hover {
      color: rgb(59, 51, 55);
    }

    .mail-table-mobile {
      height: 85px;
      padding: 12px 0px;

      .mail-mobile-head {
        position: relative;
        margin-bottom: 8px;
        width: 100%;

        .mail-mobile-icon {
          margin-right: 4px;

          .mail {
            margin-top: 4px;
            width: 13px;
          }
        }

        .mail-mobile-detail {
          display: inline-block;
          width: 100%;

          .mail-mobile-from {
            margin-bottom: 7px;
          }

          .mail-mobile-from {
            width: calc(100% - 120px);
          }

          .mail-mobile-to {
            width: calc(100% - 60px);
          }
        }

        .mail-mobile-date {
          position: absolute;
          top: 0;
          right: 0;

          .clip {
            position: absolute;
            width: 14px;
            height: 14px;
            margin-top: 3px;
            margin-left: -18px;
          }

          .arrow {
            width: 8px;
            height: 8px;
          }
        }

        .mail-mobile-number {
          position: absolute;
          top: 0;
          right: 0;
          margin-top: 22px;

          padding: 1px 5px;
          background-color: rgb(136, 136, 136);
          line-height: 14px;
          vertical-align: middle;
          color: white;

          border-radius: 4px;
        }
      }

      .mail-mobile-content {
        font-size: 12px;
        font-weight: 500;
        margin-top: 2px;
      }
    }

    .mail-mobile-subject,
    .mail-mobile-from,
    .mail-mobile-to,
    .mail-mobile-content {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

@media only screen and (min-width: 789px) {
  .mail-table-row {
    &:hover {
      color: rgb(2, 52, 222) !important;
      cursor: pointer;
    }
  }
}
</style>>