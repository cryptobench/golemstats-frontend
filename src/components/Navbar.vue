<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div class="max-w-8xl mx-auto sm:px-6 lg:px-8 bg-golemblue dark:bg-gray-800 golemnav">
    <Popover class="relative bg-golemblue dark:bg-gray-800 golemnav">
      <div class="flex justify-between items-center py-6 md:justify-start md:space-x-10">
        <div class="flex justify-start lg:w-0 lg:flex-1">
          <a href="/">
            <h1 class="sr-only">Golem Network Stats</h1>
            <h1 class="font-medium px-4 lg:px-0 text-white text-xl">Golem Network Stats</h1>
          </a>
        </div>
        <div class="mr-4 -my-2 md:hidden">
          <button
            aria-label="Theme mode toggle"
            id="theme-toggle"
            type="button"
            class="text-gray-500 mr-10 dark:text-gray-400 hover:bg-blue-600 dark:hover:bg-gray-700  rounded-lg text-sm p-2.5"
          >
            <svg id="theme-toggle-dark-icon" class="hidden w-5 h-5" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg id="theme-toggle-light-icon" class="hidden w-5 h-5" fill="#fff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <PopoverButton
            class="bg-white golemnav dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:text-gray-300 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:ring-gray-800"
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
                'group bg-golemblue dark:bg-gray-800 golemnav rounded-md inline-flex items-center text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-800',
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
                  <div class="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    <a
                      v-for="solution in network"
                      :key="solution.name"
                      :href="solution.href"
                      class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue  text-white sm:h-12 sm:w-12"
                      >
                        <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900 dark:text-gray-300">
                          {{ solution.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {{ solution.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <a
                    href="https://golem.network"
                    target="_blank"
                    class="p-5 bg-gray-50 dark:bg-gray-700 sm:p-8 flow-root rounded-md dark:hover:bg-gray-600"
                  >
                    <div class="flex items-center">
                      <div class="text-base font-medium text-gray-900 dark:text-gray-300">Want to learn more about the Golem Network?</div>
                    </div>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Head to our main website</p>
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>
          <Popover class="relative" v-slot="{ open }">
            <PopoverButton
              :class="[
                open ? 'text-white' : 'text-white',
                'group bg-golemblue dark:bg-gray-800 golemnav rounded-md inline-flex items-center text-base font-medium hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-gray-300',
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
                  <div class="relative grid gap-6 bg-white dark:bg-gray-800 px-5 py-6 sm:gap-8 sm:p-8 lg:grid-cols-2">
                    <a
                      v-for="solution in provider"
                      :key="solution.name"
                      :href="solution.href"
                      class="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div
                        class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white sm:h-12 sm:w-12"
                      >
                        <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div class="ml-4">
                        <p class="text-base font-medium text-gray-900 dark:text-gray-300">
                          {{ solution.name }}
                        </p>
                        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                          {{ solution.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <a
                    href="https://handbook.golem.network/provider-tutorials/provider-tutorial"
                    target="_blank"
                    class="p-5 bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 hover:bg-gray-100 sm:p-8 flow-root rounded-md"
                  >
                    <div class="flex items-center">
                      <div class="text-base font-medium text-gray-900 dark:text-gray-300">Join the network as a provider!</div>
                      <span
                        class="ml-3 inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-golemblue text-white "
                      >
                        Now
                      </span>
                    </div>
                    <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Click here to install Golem in 30 seconds!</p>
                  </a>
                </div>
              </PopoverPanel>
            </transition>
          </Popover>

          <a href="/network/requestor" class="text-base font-medium text-white hover:text-gray-300"> Requestor </a>
          <!-- <a href="/thorg" class="text-base font-medium text-white hover:text-gray-300"> Thorg </a> -->
        </PopoverGroup>
        <div class="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
          <button
            aria-label="Theme mode toggle"
            id="theme-toggle-desktop"
            type="button"
            class="text-gray-500 dark:text-gray-400 hover:bg-blue-600 dark:hover:bg-gray-700  rounded-lg text-sm p-2.5"
          >
            <svg
              id="theme-toggle-dark-icon-desktop"
              class="hidden w-5 h-5"
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
            </svg>
            <svg
              id="theme-toggle-light-icon-desktop"
              class="hidden w-5 h-5"
              fill="#fff"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd"
                clip-rule="evenodd"
              ></path>
            </svg>
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
        <!-- Mobile -->
        <PopoverPanel focus class="absolute top-0 z-50 inset-x-0 transition transform origin-top-right md:hidden">
          <div class="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 golemnav   ">
            <div class="pt-5 pb-6 px-5">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12 bg-golemblue rounded-md p-3 relative">
                    <component :is="golemicon" class="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div class="ml-4">
                    <div class="text-2xl font-medium text-golemblue golemtext dark:text-gray-300 golemgradient">
                      Golem Network
                    </div>
                  </div>
                </div>
                <div class="-mr-2">
                  <PopoverButton
                    class="bg-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:hover:text-gray-300 dark:text-gray-300 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 dark:focus:bg-gray-600"
                  >
                    <span class="sr-only">Close menu</span>
                    <XIcon class="h-6 w-6" aria-hidden="true" />
                  </PopoverButton>
                </div>
              </div>
              <div class="mt-8">
                <p class="text-xl mb-2 font-medium text-gray-900 dark:text-gray-300 golemgradient">Network</p>
                <nav class="grid grid-cols-1 gap-7">
                  <a
                    v-for="solution in network"
                    :key="solution.name"
                    :href="solution.href"
                    class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white">
                      <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900 dark:text-gray-400 golemtext">
                      {{ solution.name }}
                    </div>
                  </a>
                </nav>
              </div>

              <div class="mt-6">
                <p class="text-xl mb-2 font-medium text-gray-900 dark:text-gray-300 golemgradient">Provider</p>
                <nav class="grid grid-cols-1 gap-7">
                  <a
                    v-for="solution in provider"
                    :key="solution.name"
                    :href="solution.href"
                    class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white">
                      <component :is="solution.icon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900 dark:text-gray-400 golemtext">
                      {{ solution.name }}
                    </div>
                  </a>
                </nav>
              </div>
              <!-- <div class="mt-6">
                <p class="text-xl mb-2 font-medium text-gray-900 dark:text-gray-300 golemgradient">Thorg</p>
                <nav class="grid grid-cols-1 gap-7">
                  <a href="/thorg" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 thorgcolumn">
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white">
                      <component :is="thorgicon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div href="/thorg" class="ml-4 text-base font-medium text-gray-900 dark:text-gray-400 golemtext">
                      Overview
                    </div>
                  </a>
                </nav>
              </div> -->
              <div class="mt-6">
                <p class="text-xl mb-2 font-medium text-gray-900 dark:text-gray-300 golemgradient">Requestor</p>
                <nav class="grid grid-cols-1 gap-7">
                  <a href="/network/requestor" class="-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <div class="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-golemblue text-white">
                      <component :is="requestoricon" class="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div class="ml-4 text-base font-medium text-gray-900 dark:text-gray-400 golemtext">
                      Overview
                    </div>
                  </a>
                </nav>
              </div>
            </div>
            <div class="pt-6 px-5">
              <div class="grid grid-cols-2 gap-y-4 gap-x-8">
                <a
                  href="https://docs.stats.golem.network/"
                  target="_blank"
                  class="text-base font-medium text-gray-900 hover:text-gray-700 dark:text-gray-300"
                >
                  Stats API Documentation
                </a>
              </div>
            </div>
            <div class="pb-6 px-5 w-full mx-auto">
              <div class="mt-8 border-t border-gray-700 pt-8 ">
                <div class="grid justify-items-center grid-cols-4 gap-7">
                  <a
                    v-for="item in socials"
                    :key="item.name"
                    :href="item.href"
                    v-bind:class="item.color"
                    rel="noreferrer"
                    target="_blank"
                    class="cursor-pointer"
                  >
                    <span class="sr-only">{{ item.name }}</span>
                    <component :is="item.icon" v-bind:class="item.width" class="h-6 w-6 golemblue" aria-hidden="true" />
                  </a>
                </div>
                <div class="grid grid-cols-12">
                  <p class="mt-8 text-base text-gray-400 md:mt-0 md:order-1 col-start-4 col-span-6">
                    &copy; 2021 Golem Factory GmbH.
                  </p>
                </div>
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
import { ChartBarIcon, UserIcon, MenuIcon, SearchIcon, XIcon, DownloadIcon, GlobeAltIcon, ChartPieIcon, CodeIcon, ServerIcon } from "@heroicons/vue/outline"
import { ChevronDownIcon } from "@heroicons/vue/solid"
import { defineComponent, h } from "vue"
import DiscordIcon from "@/components/discordicon.vue"
import TelegramIcon from "@/components/telegramsvg.vue"
import LinkedinIcon from "@/components/linkedinsvg.vue"
import BlockfolioIcon from "@/components/blockfoliosvg.vue"
import GolemIcon from "@/components/golem.vue"
import { MailIcon } from '@heroicons/vue/outline'


const socials = [
    {
      name: "GitHub",
      href: "https://github.com/golemfactory",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
              "clip-rule": "evenodd",
            }),
          ]),
      }),
      color: "text-black githubicon dark:text-white"
    },
    {
      name: "Twitter",
      href: "https://twitter.com/golemproject",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
            }),
          ]),
      }),
      color: "text-twitter"
    },
    {
      name: "Discord",
      href: "https://chat.golem.network",
      icon: DiscordIcon,
    },

    {
      name: "Facebook",
      href: "https://www.facebook.com/golemproject",
      icon: defineComponent({
        render: () =>
          h("svg", { fill: "currentColor", viewBox: "0 0 24 24" }, [
            h("path", {
              "fill-rule": "evenodd",
              d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z",
              "clip-rule": "evenodd",
            }),
          ]),
      }),
      color: "text-facebook"
    },
    {
      name: "Telegram",
      href: "https://t.me/GolemProject",
      icon: TelegramIcon,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/golem-network/",
      icon: LinkedinIcon,
      width: "w-14"
    },
    {
      name: "Blockfolio",
      href: "https://blockfolio.com/coin/GLM",
      icon: BlockfolioIcon,
      width: "w-10"
    },
       {
      name: "Mail",
      href: "mailto:contact@golem.network",
      icon: MailIcon,
      color: "text-gray-500 thorgmail dark:text-white"
    },

]

const provider = [
  {
    name: "Online Providers",
    description: "See and filter through the list of online providers on the Golem Network",
    href: "/network/providers/online",
    icon: ChartBarIcon,
  },
    {
    name: "Node Lookup",
    description: "Lookup a specific node on the network",
    href: "/network/providers/lookup/node/",
    icon: SearchIcon,
  },
  {
    name: "Nodes by operator",
    description: "Get direct insights to all providers connected to a specific wallet.",
    href: "/network/providers/lookup/operator/",
    icon: UserIcon,
  },

]
const network = [
  {
    name: "Overview",
    description: "Dashboard over the current status of the Golem Network",
    href: "/",
    icon: GlobeAltIcon
  },
  { name: "Live Graphs", description: "Graphs containing more detailed analytics", href: "/network/live", icon: ChartPieIcon },
  { name: "Historical Statistics", description: "Historical statistics for the Golem Network", href: "/network/historical", icon: ChartBarIcon },
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
    GlobeAltIcon,
    ChartBarIcon,
    ChartPieIcon,
    CodeIcon,
    GolemIcon,
    ServerIcon,
  },
  setup() {
    return {
      provider,
      network,
      socials
    }
  },
  mounted() {
      var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

  var themeToggleDarkIconDesktop = document.getElementById('theme-toggle-dark-icon-desktop');
var themeToggleLightIconDesktop = document.getElementById('theme-toggle-light-icon-desktop');

// Change the icons inside the button based on previous settings
if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    themeToggleLightIcon.classList.remove('hidden');
    themeToggleLightIconDesktop.classList.remove('hidden');
} else {
    themeToggleDarkIcon.classList.remove('hidden');
    themeToggleDarkIconDesktop.classList.remove('hidden');
}

var themeToggleBtn = document.getElementById('theme-toggle');
var themeToggleBtnDesktop = document.getElementById('theme-toggle-desktop');

themeToggleBtn.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIcon.classList.toggle('hidden');
    themeToggleLightIcon.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});

themeToggleBtnDesktop.addEventListener('click', function() {

    // toggle icons inside button
    themeToggleDarkIconDesktop.classList.toggle('hidden');
    themeToggleLightIconDesktop.classList.toggle('hidden');

    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        }

    // if NOT set via local storage previously
    } else {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('color-theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('color-theme', 'dark');
        }
    }

});
    },
  data() {
    return {
      thorgicon: "ServerIcon",
      requestoricon: "CodeIcon",
      discordicon: "DiscordIcon",
      golemicon: "GolemIcon",
    }
  }
}
</script>
