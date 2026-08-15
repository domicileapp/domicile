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

CREATE TABLE recipes_ingredients (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    recipe_id bigint,
    sort_order integer NOT NULL,
    content text NOT NULL,
    CONSTRAINT pk_recipes_ingredients PRIMARY KEY (id)
);

CREATE TABLE recipes_instructions (
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
    recipe_id bigint,
    sort_order integer NOT NULL,
    content text NOT NULL,
    CONSTRAINT pk_recipes_instructions PRIMARY KEY (id)
);

ALTER TABLE recipes_ingredients
    ADD CONSTRAINT fk_recipes_ingredients_recipes
    FOREIGN KEY (recipe_id) REFERENCES recipes(id);

ALTER TABLE recipes_instructions
    ADD CONSTRAINT fk_recipes_instructions_recipes
    FOREIGN KEY (recipe_id) REFERENCES recipes(id);


-- +goose Down
DROP TABLE recipes_instructions;
DROP TABLE recipes_ingredients;
DROP TABLE recipes;
