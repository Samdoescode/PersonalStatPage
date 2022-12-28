import { createResource, onMount, onCleanup, Suspense, For, Component, Show, Ref, createMemo, createSignal } from "solid-js";
import Chart from 'chart.js/auto';
import { chessData, gameData, getData } from "~/functions/getData";
import { json, JSONResponseType } from "solid-start";


const parseOpening = (pgn: string) => {
    const lines = pgn.split('\n')
    const urlline = lines.find(line => line.startsWith('[ECOUrl'));
    if (urlline != undefined){
        const url = urlline.split('"')[1];
        const opening = url.substring(url.lastIndexOf('/'));
        return opening.substring(1)
    }
    return null
}

const elementCount = (input: any[]): Array<{ element: any, count: number }> => {
    const counts: { [key: string]: number } = {};
    const elements: Array<{ element: any, count: number }> = [];
    for (const element of input) {
      if (counts.hasOwnProperty(element)) {
        counts[element]++;
      } else {
        counts[element] = 1;
      }
    }
    for (const element in counts) {
        elements.push({ element, count: counts[element] });
      }
    return elements;
  }


const broudOpenings = (arr: Array<{ element: string, count: number }>) => {
    const counts: { [key: string]: number } = {};
    const elements: Array<{ element: string, count: number }> = [];
  
    for (const obj of arr) {
      const firstTwoWords = obj.element.split('-')[0] + ' ' + obj.element.split('-')[1];
      if (counts.hasOwnProperty(firstTwoWords)) {
        counts[firstTwoWords] += obj.count;
      } else {
        counts[firstTwoWords] = obj.count;
      }
    }
  
    for (const element in counts) {
      elements.push({ element, count: counts[element] });
    }
  
    return elements;
  }

export default function OpeningChart(){

     

    return(
        <Show when={chessData.length > 2} fallback={<p>loading</p>}>
            <BuildOpeningChart />
        </Show>
    )
}

function BuildOpeningChart(){

    const [detailSetting, setDetailedSetting] = createSignal(true)

    let OpeningChartCanvas
    let data
    const dataDetail = elementCount(chessData.map(data => parseOpening(data.pgn)))
    const dataBroud = broudOpenings(dataDetail)

    if (detailSetting() == true){
        data = dataDetail
    }else{
        data = dataBroud
    }
    const sortedData = data.sort((a, b) => b.count - a.count)
    const labels = sortedData.map(data => data.element)
    const xAx = sortedData.map(data => data.count)

    onMount(() => {

        new Chart(
            OpeningChartCanvas,{
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        data: xAx
                    }]
                },
                options: {
                    responsive: true,
                    
                  }
            }
        )
    })

    return(
        <canvas ref={OpeningChartCanvas}></canvas>
    )
} 

