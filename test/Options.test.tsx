import chai from 'chai'

import { Options } from '../index'

const { expect } = chai

const BASICO     = { id: 1, nombre: 'Básico'     , active: true  }
const INTERMEDIO = { id: 2, nombre: 'Intermedio' , active: true  }
const AVANZADO   = { id: 3, nombre: 'Avanzado'   , active: true  }
const EXPERTO    = { id: 4, nombre: 'Experto'    , active: false }

const catalog = [ BASICO, INTERMEDIO, AVANZADO, EXPERTO ]

describe( 'for_', () =>
{

  it('should create options from catalog', () =>
  {
    const options = Options.for_( catalog )

    expect( options.length ).to.equal( 4 )
  })

  it('should filter based on property', () =>
  {
    const options = Options.for_( catalog, 'active' )

    expect( options.length ).to.equal( 3 )
  })

  it('should filter based on function', () =>
  {
    const options = Options.for_( catalog, entry => entry.id % 2 == 0 )

    expect( options.length ).to.equal( 2 )
  })

})
