-- name: GetRecipe :one
select * from recipes
where id = $1 and deleted_at is null limit 1;

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

-- name: UpdateRecipeIngredientSortOrder :exec
update recipe_ingredients
set sort_order = $2, updated_at = now()
where id = $1;

-- name: UpdateRecipeIngredientParsed :exec
update recipe_ingredients
set
    quantity = $2,
    unit = $3,
    ingredient_name = $4,
    preparation = $5,
    parse_status = $6,
    parsed_at = now(),
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

-- name: UpdateRecipeInstructionSortOrder :exec
update recipe_instructions
set sort_order = $2, updated_at = now()
where id = $1;

-- name: UpdateRecipeInstructionContent :exec
update recipe_instructions
set content = $2, updated_at = now()
where id = $1;

-- name: DeleteRecipeInstruction :exec
delete from recipe_instructions
where id = $1;
