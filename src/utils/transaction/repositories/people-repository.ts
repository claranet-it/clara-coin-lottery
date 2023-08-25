import { Surfer } from '../entities'

export interface IPeopleRepository {
  get(): Promise<void>
  find(name: string): Readonly<Surfer>
  getPhotoUrl(name: string): string
}

const placeholder = '/images/placeholder.png'

export class PeopleRepository implements IPeopleRepository {
  private people: { [key: string]: Surfer } = {}

  async get(): Promise<void> {
    await fetch(`data/people.json`)
      .then(res => res.json())
      .then((res: Surfer[]) =>
        res.forEach((surfer: Surfer) => (this.people[surfer.username] = surfer))
      )
  }

  find(username: string): Readonly<Surfer> {
    return this.people[username]
  }

  getPhotoUrl(username?: string): string {
    const surfer = username ? this.find(username) : undefined
    return surfer?.photo ?? placeholder
  }
}
