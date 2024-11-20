<template>
	<div class="card md-5 px-5">
		<v-card class="px-5 py-5">
			<v-row align="start">
				<v-col cols="3">
					<v-img :src="trip.tripThumbnailUrl" class="md-2" height="150px"></v-img>
				</v-col>
				<v-col>
					<v-card-title>{{ trip.tripName }}</v-card-title>
					<v-card-subtitle>{{ trip.tripStartDate }} - {{ trip.tripEndDate }}</v-card-subtitle>
					<v-card-text>{{ trip.tripSummary }}</v-card-text>
				</v-col>
			</v-row>
		</v-card>
	</div>
</template>

<script setup>
defineProps({
	trip: {
		tripNo: Number,
		tripName: String,
		tripSummary: String,
		tripThumbnailUrl: String,
		tripStartDate: String,
		tripEndDate: String,
		memberNo: Number,
	},
});
</script>

<style scoped></style>
