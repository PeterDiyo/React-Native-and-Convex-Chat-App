import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// This query is used to get all groups from the database.
export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("groups").collect();
  },
});

// This query is used to get a specific group by its ID.
export const getGroup = query({
  args: { id: v.id("groups") },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("groups")
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();
  },
});

// This mutation is used to create a new group in the database.
export const create = mutation({
  args: { description: v.string(), icon_url: v.string(), name: v.string() },
  handler: async ({ db }, args) => {
    await db.insert("groups", args);
  },
});
