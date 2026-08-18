-- name: GetRecipe :one
select * from recipes
where id = $1 and deleted_at is null limit 1;

-- name: ListRecipes :many
SELECT
    id,
    name,
    short_description,
    servings,
    prep_time,
    cook_time,
    notes,
    nutrition,
    source,
    photo_url,
    created_at,
    updated_at
FROM recipes
WHERE deleted_at IS NULL
  AND (
    @search::text = ''
    OR name ILIKE '%' || @search::text || '%'
    OR short_description ILIKE '%' || @search::text || '%'
    OR notes ILIKE '%' || @search::text || '%'
  )
ORDER BY
    CASE WHEN @sort::text = 'name' AND @direction::text = 'asc'
         THEN name END ASC,
    CASE WHEN @sort::text = 'name' AND @direction::text = 'desc'
         THEN name END DESC,
    CASE WHEN @sort::text = 'created_at' AND @direction::text = 'asc'
         THEN created_at END ASC,
    CASE WHEN @sort::text = 'created_at' AND @direction::text = 'desc'
         THEN created_at END DESC
LIMIT $1 OFFSET $2;

-- name: CountRecipes :one
SELECT count(*)
FROM recipes
WHERE deleted_at IS NULL
  AND (
    @search::text = ''
    OR name ILIKE '%' || @search::text || '%'
    OR short_description ILIKE '%' || @search::text || '%'
    OR notes ILIKE '%' || @search::text || '%'
  );

-- name: CreateRecipe :one
insert into recipes (
    name,
    short_description,
    photo_url
)
values ($1, $2, $3)
returning *;

-- name: UpdateRecipe :one
update recipes
set
    name = $2,
    short_description = $3,
    photo_url = $4,
    updated_at = now()
where id = $1
returning *;

-- name: DeleteRecipe :exec
update recipes
set deleted_at = now()
where id = $1;

-- name: ListRecipeIngredients :many
select
    id,
    recipe_id,
    group_name,
    sort_order,
    raw_text,
    quantity,
    unit,
    ingredient_name,
    preparation,
    parse_status
from recipe_ingredients
where recipe_id = any($1::bigint[])
order by recipe_id, sort_order;

-- name: CreateRecipeIngredient :one
insert into recipe_ingredients (
    recipe_id,
    group_name,
    sort_order,
    raw_text
)
values ($1, $2, $3, $4)
returning *;

-- name: UpdateRecipeIngredient :exec
update recipe_ingredients
set group_name = $2,
    sort_order = $3,
    raw_text = $4,
    updated_at = now()
where id = $1;

-- name: DeleteRecipeIngredient :exec
delete from recipe_ingredients
where id = $1;

-- name: ListRecipeInstructions :many
select
    id,
    recipe_id,
    group_name,
    sort_order,
    content
from recipe_instructions
where recipe_id = any($1::bigint[])
order by recipe_id, sort_order;

-- name: CreateRecipeInstruction :one
insert into recipe_instructions (
    recipe_id,
    group_name,
    sort_order,
    content
)
values ($1, $2, $3, $4)
returning *;

-- name: UpdateRecipeInstruction :exec
update recipe_instructions
set sort_order = $2,
    content = $3,
    updated_at = now()
where id = $1;

-- name: DeleteRecipeInstruction :exec
delete from recipe_instructions
where id = $1;
