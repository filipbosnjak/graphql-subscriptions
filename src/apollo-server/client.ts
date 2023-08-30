import {createClient } from "graphqurl"


// Minimal graphql client

( async () => {
    const client = createClient({
        endpoint: 'http://localhost:8080/graphql',
        websocket: {
            endpoint: 'ws://localhost:8080/subscriptions',
            onConnectionSuccess: () => console.log('Connected'),
            onConnectionError: () => console.log('Connection Error'),
        }
    });
    try {

        //Normal queries example
        const res = await client.query(
            {
                query: 'query Query {\n' +
                    '  getAllUsers {\n' +
                    '  email,username  \n' +
                    '  }\n' +
                    '}',
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            }
        )
        console.log(res.data)

        // Subscriptions example

        client.subscribe(
            {
                subscription: 'subscription { userEditedNotification }',
            },
            (event) => {
                console.log('Event received: ', event);
                // handle event
            },
            (error) => {
                console.log('Errasor: ', error);
                // handle error
            }
        )
    } catch (e) {
        console.log(e)
    }
})()