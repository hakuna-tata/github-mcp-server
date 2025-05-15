#!/usr/bin/env node

import { GithubMcpServer } from "./server.js";

const server = new GithubMcpServer();
server.startStdioServer();