// import { shouldWriteResult } from "@apollo/client/core/QueryInfo";
import React from 'react'


const api_url = "https://api.api-ninjas.com/v1/exercises"

async function getApi(url) {
    const response = await fetch(url);

    var data = await response.json();
    console.log(data);
    if (response) {
        hideloader();
    }
    show(data);


    getApi(api_url);

    function hideloader() {
        document.getElementById('loading').style.display = 'none';
    }

    function show(data) {
        let tab =
        `<tr>
            <th>Name</th>
            <th>Type</th>
            <th>Muscle</th>
            <th>Equipment</th>
            <th>Difficulty</th>
            <th>Instructions</th>
        </tr>`

        // Loop all access rows
        for (let r of data.list) {
            tab += `<tr>
            <td>${r.name} </td>
            <td>${r.type} </td>
            <td>${r.muscle} </td>
            <td>${r.equipment} </td>
            <td>${r.difficulty} </td>
            <td>${r.instructions} </td>
            </tr>`;
        }

        // Setting innerHTML as tab variable
        document.getElementById('workouts').innerHTML = tab;

        return (
            <>
                <html lang="en">
                    <head>
                        {/* <script src="./index.js"></script> */}
                        <link rel="stylesheet" href="style.css" />
                        <meta charset= "UTF-8" />
                        <meta name= "viewport"
                            content="width=device-width, initial-scale=1.0" />
                        <title>Workouts</title>
                    </head>
                    <body>
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border"
                                role="status" id="loading">
                                <span class="sr-only">Loading...</span>
                            </div>
                        </div>
                        <h1>Workouts Available!</h1>

                        <table id="workouts"></table>
                    </body>
                </html>

            </>
        )
        
    };
}
export default show();



