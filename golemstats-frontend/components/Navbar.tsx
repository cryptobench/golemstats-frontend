import { Fragment, useState } from "react"
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react"
import { Bars3Icon, ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { ChevronDownIcon, RectangleGroupIcon } from "@heroicons/react/20/solid"
import Link from "next/link"

const network = [
    {
        name: "Overview",
        description: "Dashboard over the current status of the Golem Network",
        href: "/",
        icon: ChartPieIcon,
    },
    {
        name: "Live Graphs",
        description: "Graphs containing more detailed analytics",
        href: "/network/live",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Historical Statistics",
        description: "Historical statistics for the Golem Network",
        href: "/network/historical",
        icon: FingerPrintIcon,
    },
]
const provider = [
    {
        name: "Online Providers",
        description: "See and filter through the list of online providers on the Golem Network",
        href: "/network/providers/online",
        icon: ChartPieIcon,
    },
    {
        name: "Node Lookup",
        description: "Lookup a specific node on the network",
        href: "/network/providers/lookup/node/",
        icon: CursorArrowRaysIcon,
    },
    {
        name: "Nodes By Operator",
        description: "Get direct insights to all providers connected to a specific wallet.",
        href: "/network/providers/lookup/operator/",
        icon: FingerPrintIcon,
    },
    {
        name: "Pricing Analytics",
        description: "Explore the pricing analytics of the providers.",
        href: "/network/provider/pricing",
        icon: FingerPrintIcon,
    },
]
const callsToAction = [
    { name: "Main website", href: "#", icon: RectangleGroupIcon },
    { name: "Golem SDK", href: "#", icon: RectangleGroupIcon },
    { name: "Golem Portal", href: "#", icon: RectangleGroupIcon },
]

function classNames(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ")
}

export const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <header className="relative isolate  bg-golemblue text-white z-50">
            <nav className="mx-auto  items-center grid grid-cols-4 lg:flex p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 col-span-3">
                    <Link href="/" className="text-xl font-medium -m-1.5 p-1.5">
                        Golem Network Stats
                    </Link>
                </div>
                <div className="flex lg:hidden justify-end">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 "
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                </div>
                <div className="flex gap-x-8">
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Popover>
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                                Network
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                            >
                                <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-golemblue pt-20 shadow-lg ring-1 ring-gray-900/5">
                                    <div className="bg-white">
                                        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 gap-x-4 px-6 py-10 lg:px-8 xl:gap-x-8">
                                            {network.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50"
                                                >
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-golemblue group-hover:bg-golemblue/80">
                                                        <item.icon
                                                            className="h-6 w-6 text-white group-hover:text-white"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <a href={item.href} className="mt-6 block font-semibold text-golemblue">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-golemblue">
                                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                            <div className="grid grid-cols-1 md:grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
                                                {callsToAction.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-blue-800"
                                                    >
                                                        <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        <Popover>
                            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-white">
                                Provider
                                <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            </Popover.Button>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 -translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 -translate-y-1"
                            >
                                <Popover.Panel className="absolute inset-x-0 top-0 -z-10 bg-golemblue pt-20 shadow-lg ring-1 ring-gray-900/5">
                                    <div className="bg-white">
                                        <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-4 gap-x-4 px-6 md:py-10 lg:px-8 xl:gap-x-8">
                                            {provider.map((item) => (
                                                <div
                                                    key={item.name}
                                                    className="group relative rounded-lg p-6 text-sm leading-6 hover:bg-gray-50"
                                                >
                                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-golemblue group-hover:bg-golemblue/80">
                                                        <item.icon
                                                            className="h-6 w-6 text-white group-hover:text-white"
                                                            aria-hidden="true"
                                                        />
                                                    </div>
                                                    <a href={item.href} className="mt-6 block font-semibold text-golemblue">
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </a>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-golemblue">
                                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                                            <div className="grid grid-cols-3 divide-x divide-gray-900/5 border-x border-gray-900/5">
                                                {callsToAction.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-white hover:bg-blue-800"
                                                    >
                                                        <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </Popover>
                    </Popover.Group>

                    <a href="/network/requestor" className="hidden lg:block text-sm font-semibold leading-6 text-white">
                        Requestor
                    </a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="text-sm font-semibold leading-6 text-white">
                        Log in <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <Link href="/" className="text-xl font-medium">
                                Golem Network Stats
                            </Link>
                        </a>
                        <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6 text-white fill-white" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10 ">
                            <div className="space-y-2 py-6 grid gap-y-4 mt-4">
                                <Disclosure as="div" className="-mx-3  grid gap-y-4">
                                    {({ open }) => (
                                        <>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7  hover:bg-gray-50">
                                                Network
                                                <ChevronDownIcon
                                                    className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...network].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3  font-semibold leading-7  hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-lg font-semibold leading-7  hover:bg-gray-50">
                                                Provider
                                                <ChevronDownIcon
                                                    className={classNames(open ? "rotate-180" : "", "h-5 w-5 flex-none")}
                                                    aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="mt-2 space-y-2">
                                                {[...provider].map((item) => (
                                                    <Disclosure.Button
                                                        key={item.name}
                                                        as="a"
                                                        href={item.href}
                                                        className="block rounded-lg py-2 pl-6 pr-3 font-semibold leading-7  hover:bg-gray-50"
                                                    >
                                                        {item.name}
                                                    </Disclosure.Button>
                                                ))}
                                            </Disclosure.Panel>
                                        </>
                                    )}
                                </Disclosure>
                                <a href="#" className="-mx-3 block rounded-lg px-3  text-lg font-semibold leading-7 hover:bg-gray-50">
                                    Requestor
                                </a>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
