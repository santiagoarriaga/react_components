import React from "react"

interface CatalogItem
{
  id     : number ,
  nombre : string ,
}

export function for_
(
  catalog : CatalogItem[],
  filter ?: ( (item: CatalogItem) => boolean ) | string
)
{
  return catalog
  .filter( entry => !filter ? true :
    typeof filter === 'function' ? filter(entry) : ( entry as any )[filter]
  )
  .map( entry =>
    <option key={ entry.id } value={ entry.id }>
      { entry.nombre }
    </option>
  )
}
