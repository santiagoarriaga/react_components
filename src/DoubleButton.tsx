import React from "react"

type ValueType = string | number | boolean

enum Behavior
{
  /*
   * values is compared against id; but if value is an empty string, null or
   * undefined, both buttons are activated.
   */
  DOUBLE
  ,
  /*
   * at most one of the buttons can be activated; value is compared against id
   */
  RADIO
}

enum BootstrapStyle
{
  PRIMARY   = "primary"   ,
  SECONDARY = "secondary" ,
  SUCCESS   = "success"   ,
  DANGER    = "danger"    ,
  WARNING   = "warning"   ,
  INFO      = "info"      ,
  LIGHT     = "light"     ,
  DARK      = "dark"      ,
}

interface CatalogItem
{
  id     : ValueType      ,
  name  ?: string         , // default: id as string
  style ?: BootstrapStyle , // default: PRIMARY
}

const EMPTY_CATALOG_ITEM: CatalogItem = { id: '' }
const EMPTY_CATALOG = [ EMPTY_CATALOG_ITEM, EMPTY_CATALOG_ITEM ]

interface DoubleButtonProps
{
  value     : ValueType     ,
  catalog   : CatalogItem[] ,
  behavior ?: Behavior      , // default: RADIO
  invalid  ?: boolean       , // default: false
  action    : ( id: ValueType ) => any
}

const _checkIfShouldShowActive = ( behavior: Behavior ) =>
{
  return ( value: ValueType, id: ValueType ) =>
  {
    switch( behavior )
    {
      case Behavior.DOUBLE:
        return typeof value === 'undefined'
                   || value === null
                   || value === ''
                   || value === id
      case Behavior.RADIO:
      default: return value === id
    }
  }
}

const DoubleButton =
(
  { action, behavior, catalog, invalid, value }: DoubleButtonProps
) =>
{
  const shouldShowActive = _checkIfShouldShowActive( behavior )

  const values = catalog && catalog.length > 1 ? catalog : EMPTY_CATALOG

  const key1   = values[0].id
  const key2   = values[1].id
  const label1 = values[0].name || String( key1 )
  const label2 = values[1].name || String( key2 )
  const style1 = values[0].style || BootstrapStyle.PRIMARY
  const style2 = values[1].style || BootstrapStyle.PRIMARY

  return (
    <div role="group" className="btn-group d-flex">
      <button type="button" className={
          `btn w-100 btn-${
            shouldShowActive( value, key1 ) ? style1 : 'secondary'
          } ${
            invalid ? 'border border-danger' : ''
          }`
        }
        onClick={ () => action( key1 ) }
      >
        { label1 }
      </button>
      <button type="button" className={
          `btn w-100 btn-${
            shouldShowActive( value, key2 ) ? style2 : 'secondary'
          } ${
            invalid ? 'border border-danger' : ''
          }`
        }
        onClick={ () => action( key2 ) }
      >
        { label2 }
      </button>
    </div>
  )
}

export default { Behavior, BootstrapStyle, DoubleButton }
