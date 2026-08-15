-- name: GetRecipe :one
select * from recipes
where id = $1 limit 1;

-- name: ListRecipes :many
select 
    id,
    name,
    short_description,
    servings,
    prep_time,
    cook_time,
    notes,
    nutrition,
    source,
    created_at,
    updated_at
from recipes
where deleted_at is null
order by updated_at desc;

-- name: ListRecipeIngredients :many
select
    id,
    recipe_id,
    sort_order,
    content
from recipes_ingredients
where recipe_id = $1
order by recipe_id, sort_order;

-- name: ListRecipeInstructions :many
select
    id,
    recipe_id,
    sort_order,
    content
from recipes_ingredients
where recipe_id = $1
order by recipe_id, sort_order;

-- name: CreateRecipe :one
insert into recipes (
    name,
    short_description
)
values ($1, $2)
returning *;

-- name: UpdateRecipe :one
update recipes
set 
    name = $2,
    short_description = $3,
    updated_at = now()
where id = $1
returning *;

-- name: DeleteRecipe :exec
delete from recipes
where id = $1;
