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
  colors: string;
};

export const HistoricalComputingChart: React.FC<Props> = ({
  endpoint,
  title,
  colors,
}) => {
  const [options, setOptions] = useState<ApexOptions>({});
  const [showAnnotations, setShowAnnotations] = useState(false);
  const [series, setSeries] = useState<any[]>([]);
  const { data: apiResponse } = useSWR<any[]>(endpoint, fetcher, {
    refreshInterval: 10000,
  });
  const { data: releaseData } = useSWR<any[]>("v1/api/yagna/releases", fetcher);

  useEffect(() => {
    if (apiResponse) {
      const count: any[] = [];
      apiResponse.forEach((obj: any) => {
        count.push({ x: new Date(obj.date).getTime(), y: obj.total });
      });
      setSeries([
        {
          data: count,
          name: "Simultaneous providers computing",
        },
      ]);
    }
  }, [apiResponse]);

  useEffect(() => {
    if (releaseData) {
      const annotations = releaseData.map((release: any) => {
        return {
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
        };
      });

      setOptions({
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
        annotations: {
          xaxis: annotations,
        },
        tooltip: {
          enabled: true,
          x: {
            show: true,
            format: "dd MMM yyyy",
            formatter: function (val) {
              return new Date(val).toLocaleDateString();
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        colors: [colors],
        markers: {
          size: 0,
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
              return Math.floor(value) + " Providers";
            },
          },
        },
        xaxis: {
          type: "datetime",
        },
      });
    }
  }, [releaseData]);

  const hideshowAnnotation = () => {
    setShowAnnotations(!showAnnotations);
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

  console.log(series);

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
