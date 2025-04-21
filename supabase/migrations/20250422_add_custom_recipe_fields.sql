
-- Add new fields to user_custom_recipes table
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS spirit_base text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS secondary_spirits text[];
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS style text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS method text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS glass_type text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS ice_type text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS garnish text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS flavor_profile text[];
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS strength text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS complexity text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS color text;
ALTER TABLE user_custom_recipes ADD COLUMN IF NOT EXISTS serving_temperature text;
