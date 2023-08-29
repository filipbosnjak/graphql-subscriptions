import {ApolloServer} from "apollo-server-express"
import {ApolloGateway, IntrospectAndCompose} from "@apollo/gateway";
import express from "express";
import fs from "fs"
import * as path from "path";

//WebSocket server
import { createServer } from 'http';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

( async ()=>{
    const app = express()
    const startApolloServer = async (port: string) => {

        const server = new ApolloServer({
            csrfPrevention: true,
            gateway: new ApolloGateway({
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [
                        {
                            name: "first",
                            url: `http://localhost:${port}/graphql`,
                        }
                    ],
                }),
            })
        })

        await server.start()
        server.applyMiddleware({
            app,
            path: "/graphql"
        })
        const apolloServerPort = "9999"
        app.listen(apolloServerPort, () =>
            console.log(`playground started at: http://localhost:${apolloServerPort}${server.graphqlPath}`)
        );
    }

    fs.readFile(path.resolve(__dirname, '../main/resources/application.properties'), 'utf-8', async (err, data) => {
        if(data) {
            let port = ""
            const lines = data.split("\n")
            lines
                .filter(s => s.includes("server.port"))
                .forEach(portString => port = portString.replace("server.port=", ""))
            console.log(port)
            await startApolloServer(port)
        }
    })

})()