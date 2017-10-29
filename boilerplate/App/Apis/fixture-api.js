import Fixtures from 'fixtures'

export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: Fixtures.RootFixture
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: Fixtures.RateLimitFixture
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? Fixtures.GantmanFixture : Fixtures.SkellockFixture
    }
  }
}
