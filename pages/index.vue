<template>
  <div class="container column">
    <div class="search-mb">
			<SearchBar />
		</div>
		<div class="mail-hi">
			<MailBox />
		</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "~assets/css/global.scss";

.search-mb {
	margin-bottom: 24px;
}

.mail-hi {
	height: 100%;
}
</style>
