<template>
  <div class="mail-box">
    <h3 class="mail-box-head">Results: {{ (mailList)? mailList.length : 0 }} mail(s)</h3>
    <div class="mail-box-body" v-if="mailList && mailList.length > 0">
      <h3 v-for="mail in mailList" :key="mail.subject">{{ mail.subject }}</h3>
    </div>

    <div class="mail-box-empty" v-else>
      <Logo class="mail-box-logo" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({ mailList: "mail/mailList" }),
  },
  async created() {
		await this.$store.dispatch('mail/fetch');
		await this.$store.dispatch('mail/sort', false);
	}
};
</script>

<style lang="scss" scoped>
.mail-box {
  height: 100%;
  width: 100%;

  .mail-box-head {
    color: rgb(102, 102, 102);
    margin-bottom: 10px;
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