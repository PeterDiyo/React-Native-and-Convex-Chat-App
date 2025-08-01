import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

// This mutation is used to create a new message in the database.
export const sendMessage = mutation({
  args: {
    content: v.string(),
    group_id: v.id("groups"),
    user: v.string(),
    file: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});

export const get = query({
  args: { chatId: v.id("groups") },
  handler: async ({ db, storage }, { chatId }) => {
    const messages = await db
      .query("messages")
      .filter((q) => q.eq(q.field("group_id"), chatId))
      .collect();

    return Promise.all(
      messages.map(async (message) => {
        if (message.file) {
          const url = await storage.getUrl(message.file as Id<"_storage">);
          if (url) {
            return {
              ...message,
              file: url,
            };
          }
        }
        return message;
      })
    );
  },
});
