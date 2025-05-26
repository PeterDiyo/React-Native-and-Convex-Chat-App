import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";

const http = httpRouter();

http.route({
  path: "/sendImage",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const blob = await request.blob();
    const storageid = await ctx.storage.store(blob);

    const user = new URL(request.url).searchParams.get("user")!;
    const group_id = new URL(request.url).searchParams.get("group_id");
    const content = new URL(request.url).searchParams.get("content")!;

    await ctx.runMutation(api.messages.sendMessage, {
      group_id: group_id as Id<"groups">,
      content,
      user,
      file: storageid,
    });

    return new Response(JSON.stringify({ success: true }), {});
  }),
});

export default http;
