<template>
    <div class="bg-white dark:bg-gray-800 h-full pt-5 px-4 sm:px-6 shadow rounded-lg overflow-hidden">
        <div class="relative">
            <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300 animate-ping"></div>
            <div class="absolute top-0 right-0 -mr-1 -mt-1 w-4 h-4 rounded-full bg-green-300"></div>
            <h3 class="text-2xl mb-2 font-medium dark:text-gray-300">Network CPU Architecture</h3>
            <span class="dark:text-gray-400"
                >x86_64: <b class="mr-1">{{ data[0] }}</b> Aarch64: <b>{{ data[1] }}</b></span
            >
            <apexchart class="py-3" width="100%" height="250" type="donut" :options="chartOptions" :series="data"></apexchart>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        data: {
            type: Array,
            required: true,
        },
    },
    created() {},
    data() {
        return {
            chartOptions: {
                chart: {
                    id: "vendor-donut",
                    type: "donut",
                    zoom: {
                        autoScaleYaxis: true,
                    },
                },

                labels: ["x86_64", "Aarch64"],
                tooltip: {
                    enabled: true,
                    x: {
                        show: true,
                        format: "HH:mm:ss",
                        formatter: undefined,
                    },
                },
                dataLabels: {
                    enabled: true,
                },
                colors: ["#0000F9", "#8E6BE1"],
                markers: {
                    size: 0,
                },
                stroke: {
                    colors: [""],
                },

                fill: {
                    type: "gradient",
                    gradient: {
                        shadeIntensity: 0,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 90, 100],
                    },
                },
            },
        }
    },
}
</script>
