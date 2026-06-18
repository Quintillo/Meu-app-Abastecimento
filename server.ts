import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { db } from "./src/db/index.ts";
import * as schema from "./src/db/schema.ts";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { eq, desc, and, sql } from "drizzle-orm";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize/Seed local DB if empty
async function seedDatabaseIfEmpty() {
  try {
    const existingCountList = await db.select({ count: sql<number>`count(*)` }).from(schema.gasStations);
    const existingCount = Number(existingCountList[0]?.count || 0);

    if (existingCount === 0) {
      console.log("Database table 'gas_stations' is empty. Pre-seeding with Palmas stations...");

      // Seeds with primary gas stations
      const initialStations = [
        {
          name: "Petrolíder 75",
          brand: "Petrolider",
          address: "712 Sul - TO 050 (99284-7467) - Palmas, TO",
          latitude: -10.226030208157,
          longitude: -48.31231977914781,
          rating: 4.5,
          reviewsCount: 148,
          gasolinaComum: 7.23,
          gasolinaAditivada: 7.23,
          etanol: 5.16,
          diesel: 6.61,
          gnv: 4.89,
          lastUpdated: "Hoje cedo",
          verified: true
        },
        {
          name: "Auto Posto Eldorado 4",
          brand: "Eldorado",
          address: "Saida P/ Aparecida do Rio Negro (3225-4849) - Palmas, TO",
          latitude: -10.23054069742288,
          longitude: -48.31029231302542,
          rating: 4.2,
          reviewsCount: 92,
          gasolinaComum: 7.19,
          gasolinaAditivada: 7.29,
          etanol: 5.49,
          diesel: 7.17,
          gnv: 4.95,
          lastUpdated: "Hoje cedo",
          verified: true
        },
        {
          name: "Auto Posto Cantão",
          brand: "Ipiranga",
          address: "Próximo Rodoviária - 112 Sul (3217-4010) - Palmas, TO",
          latitude: -10.251708231058936,
          longitude: -48.31485199567801,
          rating: 4.6,
          reviewsCount: 215,
          gasolinaComum: 7.19,
          gasolinaAditivada: 7.59,
          etanol: 5.69,
          diesel: 7.19,
          gnv: 5.10,
          lastUpdated: "Ontem",
          verified: true
        },
        {
          name: "Super Posto Líder",
          brand: "Petrobras",
          address: "1006 Sul, Av. NS 10, Lote 01 (3322-6722) - Palmas, TO",
          latitude: -10.2872,
          longitude: -48.3312,
          rating: 4.4,
          reviewsCount: 78,
          gasolinaComum: 7.19,
          gasolinaAditivada: 7.29,
          etanol: 5.25,
          diesel: 6.55,
          gnv: 4.90,
          lastUpdated: "Hoje cedo",
          verified: true
        },
        {
          name: "Posto Palmas NS-04",
          brand: "Shell",
          address: "Av. NS-04, Esquina com LO-11 (3214-5500) - Palmas, TO",
          latitude: -10.2035,
          longitude: -48.3421,
          rating: 4.7,
          reviewsCount: 310,
          gasolinaComum: 7.25,
          gasolinaAditivada: 7.39,
          etanol: 5.39,
          diesel: 6.75,
          gnv: 5.15,
          lastUpdated: "Hoje cedo",
          verified: true
        }
      ];

      for (const st of initialStations) {
        await db.insert(schema.gasStations).values({
          name: st.name,
          brand: st.brand,
          address: st.address,
          latitude: st.latitude,
          longitude: st.longitude,
          rating: st.rating,
          reviewsCount: st.reviewsCount,
          gasolinaComum: st.gasolinaComum,
          gasolinaAditivada: st.gasolinaAditivada,
          etanol: st.etanol,
          diesel: st.diesel,
          gnv: st.gnv,
          lastUpdated: st.lastUpdated,
          verified: st.verified,
        });
      }
      console.log("Successfully seeded database gas stations.");
    }
  } catch (error) {
    console.error("Error checking or seeding database:", error);
  }
}

// 1. Synchronize/Upsert Auth User
app.post("/api/auth/sync", async (req, res) => {
  const { uid, email, name, avatarUrl } = req.body;
  if (!uid || !email) {
    return res.status(400).json({ error: "Missing uid or email" });
  }

  try {
    const result = await db.insert(schema.users)
      .values({
        uid,
        email,
        name: name || email.split("@")[0],
        avatarUrl: avatarUrl || "",
        points: 0,
        level: 1,
      })
      .onConflictDoUpdate({
        target: schema.users.uid,
        set: {
          email,
          name: name || undefined,
          avatarUrl: avatarUrl || undefined,
        },
      })
      .returning();

    res.json(result[0]);
  } catch (err: any) {
    console.error("Error synchronizing user:", err);
    res.status(500).json({ error: "Failed to sync user. Please try again later." });
  }
});

// 2. Fetch User Profile
app.get("/api/users/profile/:uid", async (req, res) => {
  try {
    const result = await db.select().from(schema.users).where(eq(schema.users.uid, req.params.uid));
    if (!result.length) {
      return res.status(404).json({ error: "User profile not found." });
    }
    res.json(result[0]);
  } catch (err) {
    console.error("Error loading user profile:", err);
    res.status(500).json({ error: "Database error." });
  }
});

// 3. Fetch Gas Stations List
app.get("/api/stations", async (req, res) => {
  try {
    const results = await db.select().from(schema.gasStations).orderBy(schema.gasStations.id);
    // Map database properties back to original client design structure
    const mapped = results.map(row => ({
      id: String(row.id),
      name: row.name,
      brand: row.brand,
      address: row.address,
      latitude: row.latitude,
      longitude: row.longitude,
      distance: 0, // client calculates dynamically
      rating: row.rating,
      reviewsCount: row.reviewsCount,
      prices: {
        Gasoline: row.gasolinaComum,
        GasolineAdit: row.gasolinaAditivada,
        Ethanol: row.etanol,
        Diesel: row.diesel,
        DieselS10: row.gnv, // GNV column recycled or kept
      },
      lastUpdated: row.lastUpdated,
      verified: row.verified,
    }));
    res.json(mapped);
  } catch (err) {
    console.error("Error reading stations from DB:", err);
    res.status(500).json({ error: "Failed to read gas stations." });
  }
});

// 4. Update Price / Report History Item
app.post("/api/stations/:id/report", requireAuth, async (req: AuthRequest, res) => {
  let stationIdNum = parseInt(req.params.id);
  if (isNaN(stationIdNum)) {
    const match = req.params.id.match(/^posto-(\d+)-/);
    if (match) {
      stationIdNum = parseInt(match[1]);
    }
  }
  const { fuelType, newPrice, oldPrice, isDiscount } = req.body;
  const user = req.user; // from middleware request context

  if (isNaN(stationIdNum) || !user) {
    return res.status(400).json({ error: "Invalid station id or offline." });
  }

  try {
    // 1. Verify existence of gas station
    const stations = await db.select().from(schema.gasStations).where(eq(schema.gasStations.id, stationIdNum));
    if (!stations.length) {
      return res.status(404).json({ error: "Gas station not found." });
    }
    const stationObj = stations[0];

    // 2. Map fuel type to column name
    let columnKey: "gasolinaComum" | "gasolinaAditivada" | "etanol" | "diesel" | "gnv" | null = null;
    if (fuelType === "Gasoline") columnKey = "gasolinaComum";
    if (fuelType === "GasolineAdit") columnKey = "gasolinaAditivada";
    if (fuelType === "Ethanol") columnKey = "etanol";
    if (fuelType === "Diesel") columnKey = "diesel";
    if (fuelType === "DieselS10") columnKey = "gnv";

    if (!columnKey) {
      return res.status(400).json({ error: "Invalid fuel type." });
    }

    // 3. Perform database operations: update fuel price in gas_stations
    await db.update(schema.gasStations)
      .set({
        [columnKey]: Number(newPrice),
        lastUpdated: "Agora mesmo",
      })
      .where(eq(schema.gasStations.id, stationIdNum));

    // Get DB corresponding user profile name
    const usersRecord = await db.select().from(schema.users).where(eq(schema.users.uid, user.uid));
    const reporterName = usersRecord[0]?.name || user.email?.split("@")[0] || "Colaborador";

    // 4. Insert historical logs entry
    const timestampStr = new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) + " (Hoje)";
    const ptFuelNames: Record<string, string> = {
      Gasoline: "Gasolina",
      GasolineAdit: "Aditivada",
      Ethanol: "Etanol",
      Diesel: "Diesel Comum",
      DieselS10: "Diesel S10"
    };

    const newHistoryInsert = await db.insert(schema.historyItems)
      .values({
        stationId: stationIdNum,
        stationName: stationObj.name,
        userName: reporterName,
        fuelType: ptFuelNames[fuelType] || fuelType,
        oldPrice: Number(oldPrice),
        newPrice: Number(newPrice),
        timestamp: timestampStr,
        isDiscount: !!isDiscount,
        upvotes: 0,
        downvotes: 0,
        votedUsers: [],
      })
      .returning();

    // 5. Grant reward points to user (+15 points for contribution)
    if (usersRecord.length) {
      const currentPts = usersRecord[0].points;
      const nextPts = currentPts + 15;
      const nextLevel = Math.floor(nextPts / 100) + 1;

      await db.update(schema.users)
        .set({
          points: nextPts,
          level: nextLevel,
        })
        .where(eq(schema.users.uid, user.uid));
    }

    res.json({
      success: true,
      historyItem: {
        id: String(newHistoryInsert[0].id),
        stationId: String(stationIdNum),
        stationName: stationObj.name,
        userName: reporterName,
        fuelType: ptFuelNames[fuelType] || fuelType,
        oldPrice: Number(oldPrice),
        newPrice: Number(newPrice),
        timestamp: timestampStr,
        isDiscount: !!isDiscount,
        upvotes: 0,
        downvotes: 0,
        votedUsers: [],
      }
    });

  } catch (err) {
    console.error("Error reporting price update:", err);
    res.status(500).json({ error: "Failed to report price update." });
  }
});

// 5. Fetch History
app.get("/api/history", async (req, res) => {
  try {
    const items = await db.select().from(schema.historyItems).orderBy(desc(schema.historyItems.id));
    const mapped = items.map(row => ({
      id: String(row.id),
      stationId: String(row.stationId),
      stationName: row.stationName,
      userName: row.userName,
      fuelType: row.fuelType,
      oldPrice: row.oldPrice,
      newPrice: row.newPrice,
      timestamp: row.timestamp,
      isDiscount: row.isDiscount,
      upvotes: row.upvotes,
      downvotes: row.downvotes,
      votedUsers: row.votedUsers || [],
    }));
    res.json(mapped);
  } catch (err) {
    console.error("Error loading feed history:", err);
    res.status(500).json({ error: "Failed to read history." });
  }
});

// 6. Upvote/Downvote report
app.post("/api/history/:id/vote", requireAuth, async (req: AuthRequest, res) => {
  const historyIdNum = parseInt(req.params.id);
  const { type } = req.body; // "upvote" or "downvote"
  const user = req.user;

  if (isNaN(historyIdNum) || !user) {
    return res.status(400).json({ error: "Invalid ID or missing session." });
  }

  try {
    const results = await db.select().from(schema.historyItems).where(eq(schema.historyItems.id, historyIdNum));
    if (!results.length) {
      return res.status(404).json({ error: "History card not found." });
    }
    const record = results[0];
    const votedUsersArray = (record.votedUsers as string[]) || [];

    if (votedUsersArray.includes(user.uid)) {
      return res.status(400).json({ error: "Você já deu feedback sobre esta atualização." });
    }

    const updatedVotedList = [...votedUsersArray, user.uid];

    let querySet: any = { votedUsers: updatedVotedList };
    if (type === "upvote") {
      querySet.upvotes = record.upvotes + 1;
    } else if (type === "downvote") {
      querySet.downvotes = record.downvotes + 1;
    } else {
      return res.status(400).json({ error: "Invalid vote option." });
    }

    await db.update(schema.historyItems).set(querySet).where(eq(schema.historyItems.id, historyIdNum));

    res.json({ success: true, newVoted: updatedVotedList });
  } catch (err) {
    console.error("Error during voting:", err);
    res.status(500).json({ error: "Database voting failed." });
  }
});

// 7. Rankings Leaderboard
app.get("/api/users/leaderboard", async (req, res) => {
  try {
    const leaderboard = await db.select()
      .from(schema.users)
      .orderBy(desc(schema.users.points))
      .limit(10);
    res.json(leaderboard);
  } catch (err) {
    console.error("Error fetching leaderboard:", err);
    res.status(500).json({ error: "Could not fetch leaderboard." });
  }
});


// Setup development Vite server, or serve static pages in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);

    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(
          path.resolve(process.cwd(), "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port http://0.0.0.0:${PORT}`);
    
    // Run database seeding asynchronously so it never blocks web traffic or web container boot
    seedDatabaseIfEmpty().then(() => {
      console.log("Database seed check finished.");
    }).catch((err) => {
      console.error("Non-blocking DB seeding error:", err);
    });
  });
}

startServer();
