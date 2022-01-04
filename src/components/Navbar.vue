<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8 bg-golemblue">
    <Popover class="relative bg-golemblue">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <span class="sr-only">Workflow</span>
            <h1 class="font-medium text-white text-xl">Golem Network Stats</h1>
          </a>
        </div>
        <div class="-mr-2 -my-2 md:hidden">
          <PopoverButton
            class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <span class="sr-only">Open menu</span>
            <MenuIcon class="h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
        <PopoverGroup as="nav" class="hidden md:flex space-x-10 z-50">
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-white' : 'text-white',
                'group bg-golemblue rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              ]"
            >
              <span>Network</span>
              <ChevronDownIcon
                :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    <a
                      v-for="solution in solutions"
                      :key="solution.name"
                      :href="solution.href"
                      class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12"
                      >
                        <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ solution.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ solution.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div class="p-5 bg-gray-50 sm:p-8">
                    <a href="#" class="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                      <div class="flex items-center">
                        <div class="text-base font-medium text-gray-900">Interested in being a provider?</div>
                        <span
                          class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-golemblue text-white"
                        >
                          It's super easy!
                        </span>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">Click here to install Golem in 30 seconds!</p>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-white' : 'text-white',
                'group bg-golemblue rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
              ]"
            >
              <span>Provider</span>
              <ChevronDownIcon
                :class="[open ? 'text-gray-600' : 'text-gray-400', 'ml-2 h-5 w-5 group-hover:text-gray-500']"
                aria-hidden="true"
              />
            </PopoverButton>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="opacity-0 translate-y-1"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition ease-in duration-150"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 translate-y-1"
            >
              <PopoverPanel
                class="absolute z-10 -ml-4 mt-3 transform w-screen max-w-md lg:max-w-2xl lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
              >
                <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div class="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    <a
                      v-for="solution in solutions"
                      :key="solution.name"
                      :href="solution.href"
                      class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                    >
                      <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12"
                      >
                        <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900">
                          {{ solution.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500">
                          {{ solution.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div class="p-5 bg-gray-50 sm:p-8">
                    <a href="#" class="-m-3 p-3 flow-root rounded-md hover:bg-gray-100">
                      <div class="flex items-center">
                        <div class="text-base font-medium text-gray-900">Interested in being a provider?</div>
                        <span
                          class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-golemblue text-white"
                        >
                          It's super easy!
                        </span>
                      </div>
                      <p class="mt-1 text-sm text-gray-500">Click here to install Golem in 30 seconds!</p>
                    </a>
                  </div>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <a href="#" class="text-base font-medium text-white hover:text-gray-900"> Requestor </a>
          <a href="#" class="text-base font-medium text-white hover:text-gray-900"> Thorg </a>
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <button
            type="button"
            class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DownloadIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Download Golem
          </button>
        </div>
      </div>

      <transition
        enter-active-class="duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="duration-100 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <PopoverPanel focus class="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <div>
                  <p>Golem Network</p>
                </div>
                <div class="-mr-2">
                  <PopoverButton
                    class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                  >
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-6">
                <nav class="grid grid-cols-1 gap-7">
                  <a
                    v-for="solution in solutions"
                    :key="solution.name"
                    :href="solution.href"
                    class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50"
                  >
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-indigo-500 text-white">
                      <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900">
                      {{ solution.name }}
                    </div>
                  </a>
                </nav>
              </div>
            </div>
            <div class="py-6 px-5">
              <div class="grid grid-cols-2 gap-4">
                <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Pricing </a>

                <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Docs </a>

                <a href="#" class="text-base font-medium text-gray-900 hover:text-gray-700"> Enterprise </a>
                <a
                  v-for="resource in resources"
                  :key="resource.name"
                  :href="resource.href"
                  class="text-base font-medium text-gray-900 hover:text-gray-700"
                >
                  {{ resource.name }}
                </a>
              </div>
              <div class="mt-6">
                <a
                  href="#"
                  class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Sign up
                </a>
                <p class="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?
                  {{ " " }}
                  <a href="#" class="text-indigo-600 hover:text-indigo-500"> Sign in </a>
                </p>
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script>
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from "@headlessui/vue"
import { ChartBarIcon, UserIcon, MenuIcon, SearchIcon, XIcon, DownloadIcon } from "@heroicons/vue/outline"
import { ChevronDownIcon } from "@heroicons/vue/solid"

const solutions = [
  {
    name: "Online Providers",
    description: "See and filter through the list of online providers on the Golem Network",
    href: "/network/providers/online",
    icon: ChartBarIcon,
  },
  {
    name: "Nodes by operator",
    description: "Get direct insights to all providers connected to a specific wallet.",
    href: "/operator/",
    icon: UserIcon,
  },
  {
    name: "Node Lookup",
    description: "Lookup a specific node on the network",
    href: "#",
    icon: SearchIcon,
  },
]
const resources = [
  {
    name: "Help Center",
    description: "Get all of your questions answered in our forums or contact support.",
    href: "#",
  },
  { name: "Guides", description: "Learn how to maximize our platform to get the most out of it.", href: "#" },
  { name: "Events", description: "See what meet-ups and other events we might be planning near you.", href: "#" },
  { name: "Security", description: "Understand how we take your privacy seriously.", href: "#" },
]

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    ChevronDownIcon,
    MenuIcon,
    XIcon,
    DownloadIcon,
  },
  setup() {
    return {
      solutions,
      resources,
    }
  },
}
</script>
