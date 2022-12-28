import { createResource, onMount, onCleanup, Suspense, For, Component, Show, Ref, createMemo } from "solid-js";
import Chart from 'chart.js/auto';
import { chessData, gameData, getData } from "~/functions/getData";
import { json, JSONResponseType } from "solid-start";

    
const dateArray = (startDate, endDate) => {return Array.from({length: (endDate - startDate) / (1000 * 60 * 60 * 24) + 1}, (_, i) => new Date(startDate.getTime() + i * 1000 * 60 * 60 * 24));}
const minDate = (DateArray) => {return Math.min(DateArray)}
const maxDate = (DateArray) => {return Math.max(DateArray)}


export default function Chesschart(){

    if (chessData.length < 2){
        getData()
    }

    return(
        <>
        <Show when={chessData.length > 2} fallback={<p>loading</p>}>
            <BuildChart />
        </Show>
        </>
    )
}


function BuildChart(){
    let MainChessChart: Ref<ChartItem>;
    const data = chessData.filter(data => data.time_class == "rapid")
    const datamaped = data.map((data) => {
        if(data.white.username == "Samdoeschess"){
           return data.white.rating
        } 
        return data.black.rating
    })
    const labels: any[] = data.map((data) => (new Date(data.end_time * 1000)))

    onMount(() => {
        
    new Chart(MainChessChart, {
        type: 'line',
        data: {
        labels: labels,
        datasets: [{
            
            data: datamaped,
            borderWidth: 1
        }]
        },
        options: {
        scales: {
            y: {
            beginAtZero: true
            },
            x: {
                display: false
            }
        }
        }
    });})

    return(
        <canvas class="w-full h-full col-span-6" ref={MainChessChart} />
    )
}


