# Pulling field arguments from JWT claims

Run the [sample operations](operations.graphql):

JWT with `regions: IN`.
```
stepzen request -f operations.graphql --operation-name=Customers \
   --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJJTiJdfQ.hDi3-qaIOSFKzlFvaXwSh0trXC3vjiOehSKE0OxgOdE"
```


JWT with `regions: IN, UK`.
```
stepzen request -f operations.graphql --operation-name=Customers \
    --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJJTiJdfQ.hDi3-qaIOSFKzlFvaXwSh0trXC3vjiOehSKE0OxgOdE"
```

JWT with `regions: US, UK`.
```
stepzen request -f operations.graphql --operation-name=Customers \
   --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJVUyIsIlVLIl19.pf0-A6TN_hT-ldCvsZyqYGv4Twjm9s6wO1aatCjK9Aw"
```

JWT with `regions: US, UK` and user supplied filter
```
stepzen request -f operations.graphql --operation-name=Customers \
   --var f='{"city": {"eq":"London"}}' \
   --header "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1IiwicmVnaW9ucyI6WyJVUyIsIlVLIl19.pf0-A6TN_hT-ldCvsZyqYGv4Twjm9s6wO1aatCjK9Aw"
```
