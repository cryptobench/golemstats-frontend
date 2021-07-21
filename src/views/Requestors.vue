<template>
  <div>
    <b-row>
      <b-col lg="12" class="mb-2 mt-2">
        <b-card>
          <requestorpie :key="updaterender"> </requestorpie>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import requestorpie from "@core/components/network/requestorpie.vue"
import { BCard, BCardText, BFormGroup, BButton, BFormInput, BAvatar, BBadge, BCol, BRow, BSpinner } from "bootstrap-vue"

export default {
  components: {
    BCard,
    BCardText,
    BFormGroup,
    BFormInput,
    BButton,
    BAvatar,
    BBadge,
    BCol,
    BRow,
    BSpinner,
    requestorpie,
  },
  watch: {
    "$store.state.appConfig.layout.skin": function() {
      this.updaterender += 1
    },
  },
  data() {
    return {
      loaded: false,
      wallet: "",
      updaterender: 0,
      series: [
        {
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 350,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: [],
        },
      },
    }
  },
}
</script>

<style></style>
