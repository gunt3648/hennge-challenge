<template>
  <div class="mail-box">
    <h3 class="mail-box-head">
      Results:
      <span>{{ (mailList)? mailList.length : 0 }}</span> mail(s)
    </h3>
    <div class="mail-box-body" v-if="mailList && mailList.length > 0">
      <table class="mail-table-head">
        <tr class="mail-table-row">
          <td class="mail-table-from">From</td>
          <td class="mail-table-to">To</td>
          <td class="mail-table-addto"></td>
          <td class="mail-table-subject">Subject</td>
          <td class="mail-table-attach"></td>
          <td class="mail-table-date" @click="reorder()">
            Date
            <span>
              <img
                class="arrow"
                src="~/static/icon/icon_arrow01.svg"
                :style="{ transform: isAsc ? 'rotate(180deg)' : '' }"
              />
            </span>
          </td>
        </tr>
      </table>
      <div class="mail-table-wrapper">
        <div class="mail-table-scroll">
          <table class="mail-table-body">
            <Mail v-for="mail in mailList" :key="mail.key" :mailData="mail" />
          </table>
        </div>
      </div>
    </div>

    <div class="mail-box-empty" v-else>
      <Logo class="mail-box-logo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isAsc: false,
    };
  },
  computed: {
    ...mapGetters({ mailList: "mail/mailList" }),
  },
  async created() {
    await this.$store.dispatch("mail/fetch");
    await this.$store.dispatch("mail/sort", this.isAsc);
  },
  methods: {
    async reorder() {
      this.isAsc = !this.isAsc;
      await this.$store.dispatch("mail/sort", this.isAsc);
    },
  },
};
</script>

<style lang="scss">
.mail-box {
  height: 100%;
  width: 100%;

  .mail-box-head {
    color: rgb(102, 102, 102);
    margin-bottom: 10px;

    span {
      font-size: 24px;
    }
  }

  .mail-box-body {
    height: calc(100% - 42px);
    .mail-table-head,
    .mail-table-body {
      table-layout: fixed;
      width: 100%;

      user-select: none;

      .mail-table-row {
        width: 100%;

        color: rgb(102, 102, 102);
        font-size: 18px;
        font-weight: 600;

        .mail-table-from {
          width: 18%;
        }

        .mail-table-to {
          width: 18%;
        }

        .mail-table-addto {
          width: 3%;
        }

        .mail-table-subject {
          width: 47%;
        }

        .mail-table-attach {
          width: 2%;
        }

        .mail-table-date {
          width: 12%;
          font-weight: bold;

          cursor: pointer;

          .arrow {
            height: 12px;
            width: 10px;
            margin-top: -2px;
            margin-left: 2px;

            line-height: 18px;
            vertical-align: middle;
          }
        }
      }
    }

    .mail-table-head {
      border-top: 1px rgb(225, 225, 225) solid;
      border-bottom: 1px rgb(225, 225, 225) solid;

      .mail-table-row {
        background-color: rgb(245, 245, 245);
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

    .mail-table-wrapper {
      height: calc(100% - 52px);
      overflow: scroll;
    }
  }

  .mail-box-empty {
    position: relative;
    height: calc(100% - 35px);
    width: 100%;

    border-top: 1px rgb(216, 216, 216) solid;

    .mail-box-logo {
      position: absolute;
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>