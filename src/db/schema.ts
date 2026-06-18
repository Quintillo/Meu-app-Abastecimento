// src/db/schema.ts
import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, boolean, doublePrecision, jsonb } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  avatarUrl: text('avatar_url'),
  points: integer('points').default(0).notNull(),
  level: integer('level').default(1).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const gasStations = pgTable('gas_stations', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  brand: text('brand').notNull(),
  address: text('address').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  rating: doublePrecision('rating').default(4.0).notNull(),
  reviewsCount: integer('reviews_count').default(0).notNull(),
  gasolinaComum: doublePrecision('gasolina_comum'),
  gasolinaAditivada: doublePrecision('gasolina_aditivada'),
  etanol: doublePrecision('etanol'),
  diesel: doublePrecision('diesel'),
  gnv: doublePrecision('gnv'),
  lastUpdated: text('last_updated').notNull(),
  verified: boolean('verified').default(false).notNull(),
});

export const historyItems = pgTable('history_items', {
  id: serial('id').primaryKey(),
  stationId: integer('station_id')
    .references(() => gasStations.id, { onDelete: 'cascade' })
    .notNull(),
  stationName: text('station_name').notNull(),
  userName: text('user_name').notNull(),
  fuelType: text('fuel_type').notNull(),
  oldPrice: doublePrecision('old_price').notNull(),
  newPrice: doublePrecision('new_price').notNull(),
  timestamp: text('timestamp').notNull(),
  isDiscount: boolean('is_discount').default(false).notNull(),
  upvotes: integer('upvotes').default(0).notNull(),
  downvotes: integer('downvotes').default(0).notNull(),
  votedUsers: jsonb('voted_users').default([]).notNull(), // List of client uids who voted
});

// Define Relationships
export const usersRelations = relations(users, ({ many }) => ({
  historyItems: many(historyItems),
}));

export const gasStationsRelations = relations(gasStations, ({ many }) => ({
  historyItems: many(historyItems),
}));

export const historyItemsRelations = relations(historyItems, ({ one }) => ({
  station: one(gasStations, {
    fields: [historyItems.stationId],
    references: [gasStations.id],
  }),
}));
