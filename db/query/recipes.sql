-- name: GetRecipe :one
SELECT * FROM recipes
WHERE id = $1 LIMIT 1;

-- name: ListRecipes :many
SELECT * FROM recipes
ORDER BY updated_at;

-- name: CreateRecipe :one
INSERT INTO recipes (
  title, description, instructions, ingredients, source
) VALUES (
  $1, $2, $3, $4, $5
)
RETURNING *;

-- name: UpdateRecipe :one
UPDATE recipes
SET title = $2,
description = $3,
instructions = $4,
ingredients = $5,
source = $6
WHERE id = $1
RETURNING *;

-- name: DeleteRecipe :exec
DELETE FROM recipes
WHERE id = $1;
