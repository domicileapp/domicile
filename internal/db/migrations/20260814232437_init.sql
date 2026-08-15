-- +goose Up
CREATE TABLE recipes (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    name text NOT NULL,
    short_description text,
    servings text,
    prep_time text,
    cook_time text,
    notes text,
    nutrition text,
    "source" text,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at timestamptz,
    CONSTRAINT pk_recipes PRIMARY KEY (id)
);

CREATE TABLE recipe_ingredients (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    recipe_id bigint NOT NULL,
    group_name text,
    sort_order double precision NOT NULL,
    raw_text text NOT NULL,
 
    -- structured fields, nullable until parsed
    quantity numeric,
    unit text,
    ingredient_name text,
    preparation text,
 
    parse_status text NOT NULL DEFAULT 'pending',  -- pending | parsed | failed | manual
    parsed_at timestamptz,
 
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
 
    CONSTRAINT pk_recipe_ingredients PRIMARY KEY (id),
    CONSTRAINT ck_recipe_ingredients_parse_status
        CHECK (parse_status IN ('pending', 'parsed', 'failed', 'manual'))
);

CREATE TABLE recipe_instructions (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    recipe_id bigint NOT NULL,
 
    group_name text,
    sort_order double precision NOT NULL,
 
    content text NOT NULL,
 
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP NOT NULL,
 
    CONSTRAINT pk_recipe_instructions PRIMARY KEY (id)
);

ALTER TABLE recipe_ingredients
    ADD CONSTRAINT fk_recipe_ingredients_recipes
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE;

ALTER TABLE recipe_instructions
    ADD CONSTRAINT fk_recipe_instructions_recipes
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE;

-- Indexes
CREATE INDEX idx_recipe_ingredients_recipe_id ON recipe_ingredients (recipe_id, sort_order);
CREATE INDEX idx_recipe_ingredients_parse_status ON recipe_ingredients (parse_status);
CREATE INDEX idx_recipe_instructions_recipe_id ON recipe_instructions (recipe_id, sort_order);

-- +goose Down
DROP TABLE recipes_instructions;
DROP TABLE recipes_ingredients;
DROP TABLE recipes;
