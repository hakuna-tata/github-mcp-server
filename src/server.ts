import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";

class GithubMcpServer {
  private server: McpServer;
  private transport: StdioServerTransport | SSEServerTransport | null = null;

  constructor() {
    this.server = new McpServer({
      name: 'github-mcp-server',
      version: '0.0.1'
    })
  }
}

export { GithubMcpServer };