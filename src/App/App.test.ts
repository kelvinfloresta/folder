import { App } from './App'
import { CommandError } from '../Domain/Command/CommandError'
import { SpyLogger } from '../__fixtures__/SpyLogger'

/**
 * SUT means `System Under Test`
 *
 * [See more](https://en.wikipedia.org/wiki/System_under_test)
 */
function makeSut() {
  return new App([], new SpyLogger())
}

describe('App', () => {
  describe('Create', () => {
    it('should create a folder', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits')

      expect(sut.folders).toHaveLength(1)
      expect(sut.folders[0]).toMatchObject({ name: 'fruits', subFolders: [] })
    })

    it('should be able to create multiple folders', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits/apples/fuji')
      sut.execute('LIST')

      expect(sut.folders).toMatchSnapshot()
    })

    it('should not duplicate', () => {
      const sut = makeSut()
      sut.execute('CREATE fruits/apples')
      sut.execute('CREATE fruits/apples/fuji')

      expect(sut.folders).toMatchSnapshot()
    })

    it('should be case insensitive', () => {
      const sut = makeSut()

      sut.execute('cReAtE fruits/apples/fuji')

      expect(sut.folders).toMatchSnapshot()
    })
  })

  describe('List', () => {
    it('should list all folders', () => {
      const spyLogger = new SpyLogger()
      const sut = new App([], spyLogger)
      sut.execute('CREATE fruits')
      sut.execute('CREATE vegetables')

      sut.execute('LIST')

      const expected = `fruits\nvegetables`
      expect(spyLogger.info).toHaveBeenCalledWith(expected)
    })

    it('should list sub folders correctly', () => {
      const spyLogger = new SpyLogger()
      const sut = new App([], spyLogger)

      sut.execute('CREATE fruits/apples/fuji')

      sut.execute('LIST')

      expect(spyLogger.info.mock.lastCall[0]).toMatchSnapshot()
    })
  })

  describe('Delete', () => {
    it('should delete a folder', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits')
      sut.execute('DELETE fruits')

      expect(sut.folders).toHaveLength(0)
    })

    it('should be able to delete sub folders', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits/apples/fuji')

      sut.execute('DELETE fruits/apples/fuji')
      expect(sut.folders).toMatchSnapshot()

      sut.execute('DELETE fruits/apples')
      expect(sut.folders).toMatchSnapshot()

      sut.execute('DELETE fruits')
      expect(sut.folders).toMatchSnapshot()
    })

    it('should fail if folder not found', () => {
      const spyLogger = new SpyLogger()
      const sut = new App([], spyLogger)
      sut.execute('DELETE fruits')

      const expectedMessage = `Cannot delete fruits - fruits does not exist`

      expect(spyLogger.warn).toHaveBeenCalledTimes(1)
      expect(spyLogger.warn).toHaveBeenCalledWith(expectedMessage)
    })
  })

  describe('Move', () => {
    it('should move a folder', () => {
      const sut = makeSut()

      sut.execute('CREATE foods')
      sut.execute('CREATE fruits')
      sut.execute('MOVE fruits foods')

      expect(sut.folders).toHaveLength(1)
      expect(sut.folders[0].name).toEqual('foods')
      expect(sut.folders[0].subFolders).toHaveLength(1)
      expect(sut.folders[0].subFolders[0].name).toEqual('fruits')
    })

    it('should be able to move a folder to a subfolder', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits/apples')
      sut.execute('CREATE fuji')
      expect(sut.folders).toMatchSnapshot()

      sut.execute('MOVE fuji fruits/apples')

      expect(sut.folders).toMatchSnapshot()
    })

    it('should be able to move a sub folder to a folder', () => {
      const sut = makeSut()

      sut.execute('CREATE fruits/apples')
      sut.execute('CREATE foods')

      expect(sut.folders).toMatchSnapshot()

      sut.execute('MOVE fruits foods')

      expect(sut.folders).toMatchSnapshot()
    })
  })
})
