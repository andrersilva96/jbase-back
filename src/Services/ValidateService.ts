export abstract class Validate {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static json (data:any) :boolean {
    if (data.constructor !== Object || Object.keys(data).length > 10) {
      return false
    }

    for (const value in data) {
      if (data[value] instanceof Object) {
        return false
      }
    }

    return true
  }
}
