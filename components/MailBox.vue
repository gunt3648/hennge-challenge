<template>
  <div class="mail-box">
    <h3 class="mail-box-head">Results: {{ mailList.length }} mail(s)</h3>
    <div class="mail-box-body" v-if="mailList.length > 0">mail(s) found!</div>
    <div class="mail-box-empty" v-else>
      <Logo class="mail-box-logo" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mailList: [],
    };
  },
  method: {
    fetchMail: function () {
      this.mailList = [
        {
          subject: "dummy mail 1",
          from: "aaa@example.com",
          to: ["zzz.zzz@example.com"],
          date: new Date(2020, 1, 1, 0, 20),
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          attach: [],
        },
        {
          subject: "[dummy] this is a dummy mail. please do not reply",
          from: "bbb.bbbb@example.com",
          to: ["yyy.yyy@example.com", "xx@example.com"],
          date: new Date(2020, 1, 1, 0, 10),
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          attach: ["data.csv", "data2.zip"],
        },
        {
          subject: "[web:333] abcdefghijklmnopqrstuvwxyz",
          from: "aaa@example.com",
          to: ["zzz.zzz@example.com"],
          date: new Date(2019, 12, 31, 10, 20),
          content: "hello world!",
          attach: [],
        },
        {
          subject: "dummy mail 1",
          from: "aaa@example.com",
          to: ["zzz.zzz@example.com"],
          date: new Date(2019, 12, 31, 20, 20),
          content: "demo mail",
          attach: ["test.txt"],
        },
      ];
    },
  },
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
		height: calc( 100% - 35px);
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