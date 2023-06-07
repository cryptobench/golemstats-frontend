<template>
    <div class="fixed inset-x-0 bottom-0 z-50" v-show="show">
        <div class="bg-golemblue">
            <div class="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
                <div class="flex flex-wrap items-center justify-between">
                    <div class="flex w-0 flex-1 items-center">
                        <span class="flex rounded-lg p-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-yellow-300"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                />
                            </svg>
                        </span>
                        <p class="ml-3 truncate font-medium text-white">
                            <span class="md:hidden"
                                >A global outage on OVH Cloud means that some stats are not updating correctly at the moment. We are
                                monitoring the situation.</span
                            >
                            <span class="hidden md:inline">
                                A global outage on OVH Cloud means that some stats are not updating correctly at the moment. We are
                                monitoring the situation.</span
                            >
                        </p>
                    </div>

                    <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button
                            @click="show = false"
                            type="button"
                            class="-mr-1 flex rounded-md p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                        >
                            <span class="sr-only">Dismiss</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-6 h-6 text-white"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner",
    data() {
        return {
            show: true,
        }
    },
}
</script>
