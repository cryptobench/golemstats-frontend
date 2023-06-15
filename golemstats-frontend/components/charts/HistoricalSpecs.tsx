// @ts-nocheck
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetcher } from "@/fetcher";
import { RoundingFunction } from "@/lib/RoundingFunction";
import { ApexOptions } from "apexcharts";
import useSWR from "swr";

const DynamicApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Props = {
  endpoint: string;
  title: string;
  colors: string[];
  yaxisLabel: string;
};

const processData = (apiResponse: any[], yaxisLabel: string) => {
  const result: any[] = [];

  apiResponse.forEach((obj) => {
    let value;

    if (yaxisLabel === "Providers") {
      value = obj.online;
    } else if (
      yaxisLabel.toLowerCase() === "cores" ||
      yaxisLabel.toLowerCase() === "online"
    ) {
      value = obj[yaxisLabel.toLowerCase()];
    } else {
      value = obj[yaxisLabel.toLowerCase()] / 1024;
    }

    result.push([obj.date, RoundingFunction(value, 0)]);
  });

  return [
    {
      data: result,
      name: `${yaxisLabel}`,
    },
  ];
};

export const HistoricalSpecs: React.FC<Props> = ({
  endpoint,
  title,
  colors,
  yaxisLabel,
}) => {
  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      id: "area-datetime",
      type: "area",
      zoom: {
        autoScaleYaxis: true,
      },
      animations: {
        enabled: false,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
        formatter: undefined,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: colors,
    markers: {
      size: 0,
    },
    annotations: {
      xaxis: [],
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.1,
        inverseColors: false,
        opacityFrom: 0.2,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      title: {
        rotate: -90,
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-title",
        },
      },
      labels: {
        formatter: function (value) {
          return value + " ";
        },
      },
    },
    xaxis: {
      type: "datetime",
      title: {
        offsetX: -25,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "12px",
          fontWeight: 600,
          cssClass: "apexcharts-yaxis-title",
        },
      },
      labels: {
        datetimeFormatter: {
          year: "yyyy",
          month: "MMM 'yy",
          day: "dd MMM",
          hour: "HH:mm:ss",
        },
      },
    },
  });

  const [showAnnotations, setShowAnnotations] = useState(false);
  const [hasFetchedAnnotations, setHasFetchedAnnotations] = useState(false);

  const [series, setSeries] = useState<any[]>([]);
  const { data: apiResponse } = useSWR<any[]>(endpoint, fetcher, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    apiResponse && setSeries(processData(apiResponse, yaxisLabel));
  }, [apiResponse, yaxisLabel]);

  const fetchAnnotations = async (
    url: string
  ): Promise<ApexOptions["annotations"]["xaxis"]> => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      return data.map(
        (release: { tag_name: string; published_at: string }) => ({
          x: new Date(release.published_at).getTime(),
          strokeDashArray: 0,
          borderColor: "#3F51B5",
          label: {
            borderColor: "#3F51B5",
            style: {
              color: "#fff",
              background: "#3F51B5",
            },
            text: `${release.tag_name} Released`,
          },
        })
      );
    } catch (err) {
      console.error("Error fetching annotations:", err);
      return [];
    }
  };

  const hideshowAnnotation = async () => {
    setShowAnnotations(!showAnnotations);

    if (!hasFetchedAnnotations) {
      const annotations = await fetchAnnotations("/v1/api/yagna/releases");

      setOptions((prevOptions) => ({
        ...prevOptions,
        annotations: { ...prevOptions.annotations, xaxis: annotations },
      }));

      setHasFetchedAnnotations(true);
    }

    const elem = document.getElementsByClassName(
      "apexcharts-xaxis-annotations"
    );

    if (showAnnotations) {
      Array.from(elem).forEach(
        (element: any) => (element.style.visibility = "hidden")
      );
    } else {
      Array.from(elem).forEach(
        (element: any) => (element.style.visibility = "visible")
      );
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl">
      <h1 className="text-2xl font-medium dark:text-gray-300 mb-2">{title}</h1>
      {showAnnotations ? (
        <button
          aria-label="Enable or Disable Annotations"
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={hideshowAnnotation}
        >
          Hide Release Labels
        </button>
      ) : (
        <button
          aria-label="Enable or Disable Annotations"
          type="button"
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-2xl text-white bg-golemblue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          onClick={hideshowAnnotation}
        >
          Show Release Labels
        </button>
      )}
      <div className="mt-4">
        <DynamicApexChart
          width="100%"
          height="350"
          series={series}
          options={options}
          type="area"
        />
      </div>
    </div>
  );
};
