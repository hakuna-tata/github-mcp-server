import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { z } from "zod";
import Koa from 'koa';
import Router from 'koa-router';

const app = new Koa();
const router = new Router();

class GithubMcpServer {
  private server: McpServer;
  private transport: StdioServerTransport | SSEServerTransport | null = null;

  constructor() {
    this.server = new McpServer({
      name: 'github-mcp-server',
      version: '0.0.1'
    }, {
      capabilities: {}
    });

    this.registerTools();
  }

  registerTools() {
    this.server.tool(
      'list-repos',
      '列出所有仓库',
      {},
      async () => {
        return {
          content: []
        }
      }
    );

    this.server.tool(
      'push-code',
      '提交代码',
      {},
      async () => {
        return {
          content: []
        }
      }
    );
  }

  async startStdioServer() {
    this.transport = new StdioServerTransport();
    await this.server.connect(this.transport);
  }

  startSSEServer(PORT = 5000) {
    router.get("/sse", async (ctx) => {
      this.transport = new SSEServerTransport("/messages", ctx.res);
      await this.server.connect(this.transport);
    });
    router.post("/messages", async (ctx) => {
      if (this.transport) {
        (this.transport as SSEServerTransport).handlePostMessage(ctx.req, ctx.res);
      }
    });

    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

export { GithubMcpServer };