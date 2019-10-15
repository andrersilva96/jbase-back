export abstract class Validate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public static json (data:any, checkSecondNivel = false) :boolean {
    if (data.constructor !== Object || Object.keys(data).length === 0 || Object.keys(data).length > 10) {
      return false
    }

    for (const value in data) {
      if (data[value] instanceof Object && checkSecondNivel) {
        for (const secondValue in data[value]) {
          if (data[value][secondValue] instanceof Object) {
            return false
          }
        }
      }
    }

    return true
  }
}
