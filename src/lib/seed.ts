import { supabase } from "@/integrations/supabase/client";
import { restaurantTables } from "@/data/tables";
import { menuItems } from "@/data/menuItems";

export async function seedDatabase() {
  try {
    // Seed tables
    console.log("Seeding restaurant tables...");
    const { error: tablesError } = await supabase
      .from("restaurant_tables")
      .upsert(restaurantTables, { onConflict: "id" });

    if (tablesError) {
      console.error("Error seeding tables:", tablesError);
      return false;
    }

    // Seed menu items
    console.log("Seeding menu items...");
    const { error: menuError } = await supabase
      .from("menu_items")
      .upsert(menuItems, { onConflict: "id" });

    if (menuError) {
      console.error("Error seeding menu items:", menuError);
      return false;
    }

    console.log("Database seeded successfully!");
    return true;
  } catch (error) {
    console.error("Seeding failed:", error);
    return false;
  }
}