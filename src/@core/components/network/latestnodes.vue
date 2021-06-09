<template>
  <div>
    <b-card class="h-100">
      <h3>Newest providers</h3>
      <span class="card-text text-muted h5"
        >Showing latest <b>{{ this.count }}</b></span
      >
      <b-form-input
        class="mb-1 mt-1"
        type="number"
        @keyup.enter="fetchData($event.target.value)"
        :placeholder="this.count"
      ></b-form-input>
      <b-table
        responsive
        hover
        outlined
        :fields="fields"
        @row-clicked="expandAdditionalInfo"
        :items="items"
        show-empty
        empty-text="No online providers found"
      >
        <!-- A virtual column -->
        <template #cell(Name)="data">
          {{ data.value }}
          <b-badge v-if="data['item'].Online" pill variant="success"
            >Online</b-badge
          >
          <b-badge v-else pill variant="danger">Offline</b-badge>
        </template>

        <!-- A custom formatted column -->
        <template #cell(Subnet)="data">
          <div class="d-flex align-items-center">
            <b-badge
              class="w-100"
              v-if="data['item'].Mainnet"
              pill
              variant="primary"
              >Mainnet</b-badge
            >
            <b-badge class="w-100" v-else pill variant="warning"
              >Testnet</b-badge
            >
          </div>
        </template>

        <!-- A custom formatted column -->
        <template #cell(Cores)="data">
          <div class="d-flex align-items-center">
            <b-avatar
              v-if="data['item'].Vendor == 'AuthenticAMD'"
              class="mr-1"
              variant="light-danger"
              rounded
            >
              <feather-icon icon="CpuIcon" size="18" />
            </b-avatar>
            <b-avatar v-else class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="CpuIcon" size="18" />
            </b-avatar>
            {{ data.value }}
          </div>
        </template>

        <template #cell(Memory)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="LayersIcon" size="18" />
            </b-avatar>
            {{ data.value }} GB
          </div>
        </template>

        <!-- A virtual composite column -->
        <template #cell(Disk)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="HardDriveIcon" size="18" />
            </b-avatar>
            {{ data.value }} GB
          </div>
        </template>
        <template #cell(Earnings)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-success" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            {{ data.value }}
          </div>
        </template>
        <template #cell(cpu_hour)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            {{ data.value }}
          </div>
        </template>
        <template #cell(per_hour)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            {{ data.value }}
          </div>
        </template>
        <template #cell(start_price)="data">
          <div class="d-flex align-items-center">
            <b-avatar class="mr-1" variant="light-primary" rounded>
              <feather-icon icon="DollarSignIcon" size="18" />
            </b-avatar>
            {{ data.value }}
          </div>
        </template>
      </b-table>
      <!-- <div class="text-center" v-else>
        <b-spinner variant="primary" label="Text Centered" />
      </div> -->
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BCol,
  BFormInput,
  BRow,
  BTable,
  BAvatar,
  BSpinner,
  BBadge,
} from 'bootstrap-vue'
import axios from '@axios'
export default {
  components: {
    BCard,
    BBadge,
    BRow,
    BAvatar,
    BFormInput,
    BTable,
    BCol,
    BSpinner,
  },
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.fetchData(this.count)
  },
  mounted: function () {
    this.timer = setInterval(() => {
      this.fetchData(this.count)
    }, 15000)
  },
  methods: {
    floorFigure: function floorFigure(figure, decimals) {
      if (!decimals) decimals = 2
      var d = Math.pow(10, decimals)
      return (parseInt(figure * d) / d).toFixed(decimals)
    },
    expandAdditionalInfo(row) {
      this.$router.push({ name: 'node', params: { id: row.id } })
    },
    fetchData(numberofnodes) {
      this.count = numberofnodes
      this.items.length = 0
      axios
        .get('/v1/network/historical/nodes/' + numberofnodes)
        .then((response) => {
          let apiResponse = response.data

          apiResponse.forEach((obj) => {
            if (
              obj.data['golem.com.payment.platform.erc20-mainnet-glm.address']
            ) {
              var mainnet = true
              var wallet =
                obj.data['golem.com.payment.platform.erc20-mainnet-glm.address']
              //  block of code to be executed if the condition is true
            } else {
              var mainnet = false
              var wallet =
                obj.data[
                  'golem.com.payment.platform.erc20-rinkeby-tglm.address'
                ]
              //  block of code to be executed if the condition is false
            }
            const event = new Date(obj.created_at)
            this.items.push({
              Name: obj.data['golem.node.id.name'],
              Online: obj.online,
              id: obj.data['id'],
              Memory: this.floorFigure(obj.data['golem.inf.mem.gib']),
              Disk: this.floorFigure(obj.data['golem.inf.storage.gib']),
              Cores: obj.data['golem.inf.cpu.threads'],
            })
          })
        })

      this.loaded = true
    },
  },

  data() {
    return {
      loaded: false,
      items: [],
      fields: [
        /* 
          Optionally define a class per header, 
          this will overlay whatever thead-class background you choose 
        */
        {
          key: 'Name',
          label: 'Provider Name',
          tdClass: 'primary bold',
          sortable: true,
        },
        { key: 'Cores', label: 'Cores', sortable: true },
        { key: 'Memory', label: 'Memory (GB)', sortable: true },
        { key: 'Disk', label: 'Disk (GB)', sortable: true },
      ],
    }
  },
}
</script>
