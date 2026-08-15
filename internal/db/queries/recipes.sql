-- name: GetRecipe :one
select * from recipes
where id = $1 limit 1;

-- name: ListRecipes :many
select * from recipes
order by title asc;

-- name: CreateRecipe :one
insert into recipes (
    title,
    short_description
)
values ($1, $2)
returning *;

-- name: UpdateRecipe :one
update recipes
set 
    title = $2,
    short_description = $3,
    updated_at = now()
where id = $1
returning *;

-- name: DeleteRecipe :exec
delete from recipes
where id = $1;
