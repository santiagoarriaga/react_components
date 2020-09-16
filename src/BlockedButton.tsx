import React from "react"

interface BlockedButtonProps
{
  action        : ()                     => any,
  unblockAction : ( unblocked: boolean ) => any,
  unblock       : boolean ,
  text          : string  ,
}

const BlockedButton =
(
  { action, unblockAction, unblock, text }: BlockedButtonProps
) =>
{
  const execute = () =>
  {
    unblockAction( false )
    action()
  }

  return (
    <div role="group" className="btn-group d-flex">
      <div className="btn btn-danger">
        <input type="checkbox" className="mt-1"
          checked={ unblock }
          onChange={ e => unblockAction( e.target.checked ) }
        />
      </div>
      <button className="btn btn-danger btn-block"
        disabled={ !unblock }
        onClick={ execute }
      >
        { text }
      </button>
    </div>
  )
}

export default { BlockedButton }
